'use strict';

/**
 * Payments.js controller
 *
 * @description: A set of functions called "actions" for managing `Payments`.
 */

const paypal = require('paypal-rest-sdk');

const calculateOrderAmount = require("../utils/calculateOrderAmount")
const createTransactionObject = require("../utils/createTransactionObject")
const getPaymentConfig = require("../utils/getPaymentConfig")

// payment platforms strategy pattern (add all platforms we support here)...
const platforms = {
  stripe: require('../platforms/stripe'),
  paypal: require("../platforms/paypal")
};

module.exports = {
  create: async (ctx) => {
    if(!Object.keys(platforms).includes(ctx.params.platform)) {
      return {
        success: false,
        message: "Invalid payment platform!"
      }
    }

    if(!ctx.request.body.cartID) {
      return {
        success: false,
        message: "CartID not found!"
      }
    }

    const cart = await strapi.query("cart").findOne({ id: ctx.request.body.cartID })

    if(!cart) {
      return {
        success: false,
        message: "Cart not found!"
      }
    }

    const result = await getPaymentConfig(cart)

    if(!result.success) {
      return {
        success: false,
        message: result.message
      }
    }

    if(!result.config) {
      return {
        success: false,
        message: "Payment config not found!" 
      }
    }

    let currency = cart.settings.currency || "USD"

    return platforms[result.paymentMethod](result.config, { ...ctx.request.body, cart, currency })
  },
  paymentsuccess: async (ctx) => {
    try {
      if(!ctx.request.query.cartID) {
        return {
          success: false,
          message: "CartID not found!"
        }
      }
  
      const cart = await strapi.query("cart").findOne({ id: ctx.request.query.cartID })
  
      if(!cart) {
        return {
          success: false,
          message: "Cart not found!"
        }
      }

      let result = await getPaymentConfig(cart)

      if(!result.success) {
        return {
          success: false,
          message: result.message
        }
      }
  
      if(!result.config) {
        return {
          success: false,
          message: "Payment config not found!" 
        }
      }

      paypal.configure(result.config.secret_key);
  
      result = await calculateOrderAmount(cart)
        
      if(!result.success || result.totalAmount == 0) {
          return {
            success: false,
            error: result.message
          }
      }

      const transactions = createTransactionObject(cart.items, result.totalAmount, result.subTotal, ctx.request.query.currency)

      const payerId = ctx.request.query.PayerID;
      const paymentId = ctx.request.query.paymentId;

      const execute_payment_json = {
        'payer_id': payerId,
        'transactions': transactions
      };
      
      const distribution = await strapi.query("distribution").findOne({ id: cart.settings.distributionID })

      return new Promise((resolve, reject) => {
        paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
          if (error) {
            reject(error);
          } else {
            await strapi.query("cart").update({ id: cart.id }, { status: "completed" })
            resolve({
              success: true,
              payment
            })
          }
        });
      }).then(data => {
        return ctx.response.redirect(`${strapi.config.get("custom.environments.front")[distribution.settings.sourceCode.environment]}/${distribution.id}?cartId=${cart.id}`)
      })
    } catch (e) {
      return {
        success: false,
        error: e
      };
    }
  },

  paymentcancel: async (ctx) => {
    if(!ctx.request.query.cartID) {
      return {
        success: false,
        message: "CartID not found!"
      }
    }

    const cart = await strapi.query("cart").findOne({ id: ctx.request.query.cartID })

    const distribution = await strapi.query("distribution").findOne({ id: cart.settings.distributionID })

    if(!cart) {
      return {
        success: false,
        message: "Cart not found!"
      }
    }
    
    await strapi.query("cart").update({ id: cart.id }, { status: "canceled" })

    return ctx.response.redirect(`${strapi.config.get("custom.environments.front")[distribution.settings.sourceCode.environment]}/${distribution.id}?cartId=${cart.id}`)
  },

  getStripeKey: async (ctx) => {
    if(!ctx.params.cartID) {
      return {
        success: false,
        message: "CartID not found!"
      }
    }

    const cart = await strapi.query("cart").findOne({ id: ctx.params.cartID })

    if(!cart) {
      return {
        success: false,
        message: "Cart not found!"
      }
    }

    const result = await getPaymentConfig(cart)

    if(!result.success) {
      return {
        success: false,
        message: result.message
      }
    }

    if(!result.config) {
      return {
        success: false,
        message: "Payment config not found!" 
      }
    }
    
    return {
      success: true,
      publishableKey: result.config.publishableKey
    }
  }
};
