'use strict';

/**
 * Products.js controller
 *
 * @description: A set of functions called "actions" for managing `Products`.
*/

// ecommerce platforms strategy pattern (add all platforms we support here)...
const platforms = {
  shopify: require('../platforms/shopify/'),
  wooCommerce: require("../platforms/woocommerce/"),
  magento: require("../platforms/magento/")
};


const getClientConfig = require("../../../common/getClientConfig")

module.exports = {
  getAProduct: async (ctx) => {
    const name = 'product';
    const { productId, storefrontId } = ctx.params
    
    const config = await getClientConfig(storefrontId)

    if(!config || !config.success) {
      return {
        success: false,
        message: config.message
      }
    }


    return await platforms[config.provider](config, name, { id: productId })
  }
};
