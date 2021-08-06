/* eslint-disable no-unused-vars */

const Stripe = require('stripe');

const calculateOrderAmount = require("../../utils/calculateOrderAmount")

module.exports = async function(config, data) {
  try {
    const stripe = Stripe(config.secret_key);
    
    const { paymentMethodId, cart, currency } = data;

    const result = await calculateOrderAmount(cart)
    
    if(!result.success || result.totalAmount == 0) {
      return {
        success: false,
        error: result.message
      }
    }

    // Create new PaymentIntent with a PaymentMethod ID from the client.
    const intent = await stripe.paymentIntents.create({
      amount: result.totalAmount,
      currency: currency,
      payment_method: paymentMethodId,
      error_on_requires_action: true,
      confirm: true
    });

    if(intent.client_secret) {
      await strapi.query("cart").update({ id: cart.id }, { status: "completed" })
    } else {
      await strapi.query("cart").update({ id: cart.id }, { status: "canceled" })
    }

    // Send the client secret to the client
    return { success: true, clientSecret: intent.client_secret };
  } catch (e) {
    // Handle "hard declines" e.g. insufficient funds, expired card, card authentication etc
    // See https://stripe.com/docs/declines/codes for more

    await strapi.query("cart").update({ id: data.cart.id }, { status: "canceled" })

    if (e.code === "authentication_required") {
      return {
        error:
          "This card requires authentication in order to proceeded. Please use a different card."
      };
    } else {
      return { error: e.message };
    }
  }
};
  