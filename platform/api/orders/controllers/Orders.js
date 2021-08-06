'use strict';

/**
 * Orders.js controller
 *
 * @description: A set of functions called "actions" for managing `Orders`.
 */

// ecommerce platforms strategy pattern (add all platforms we support here)...
const platforms = {
  shopify: require('../platforms/shopify'),
  wooCommerce: require("../platforms/woocommerce"),
  magento: require("../platforms/magento")
};

const getClientConfig = require("../../../common/getClientConfig")

module.exports = {
  findOne: async (ctx) => {
    const config = await getClientConfig(ctx.request.body.distributionID)
    if(!config || !config.success) {
      return {
        success: false,
        message: config.message
      }
    }

    // Attempt to get their order...
    const response = platforms[config.provider](config, 'getOrder');
    
    // Give them their order...
    return response;
  },
  /**
   * Create a/an orders record.
   *
   * @return {Object}
   */  
  create: async (ctx) => {
    
    const config = await getClientConfig(ctx.request.body.distributionID)
    if(!config || !config.success) {
      return {
        success: false,
        message: config.message
      }
    }


    const { data } = ctx.request.body

    const response = platforms[config.provider](config, 'createOrder', { data });
    // Perform the proper ecommerce platform products query...
    
    // return the result...
    return response;
  },
  /**
   * Update a/an orders record.
   *
   * @return {Object}
   */
  update: async (ctx, next) => {
    
    const config = await getClientConfig(ctx.request.body.distributionID)
    if(!config || !config.success) {
      return {
        success: false,
        message: config.message
      }
    }

    let order_id;
    
    order_id = ctx.request.body.data.order_id;
    
    const { data } = ctx.request.body

    const response = platforms[config.provider](config, 'updateOrder', { order_id,  data });
    
    return response;
  },

  shopifyCreateOrder: async (ctx) => {
  
    const config = await getClientConfig(ctx.request.body.distributionID)
    if(!config || !config.success) {
      return {
        success: false,
        message: config.message
      }
    }

    const { data } = ctx.request.body

    const response = platforms[config.provider](config, "shopifyCreateOrder", { data }); 
    // return the result...
    return response;
  }
};