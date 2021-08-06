
/**
 * In order to support any platform for ecommerce, we need to have this strategy router.
 * This is for Shopify. To add another one, just support the below methods.
 * 
 * Please look at how Shopify structures their products.  You must support that format
 * in order for the platform to be able to handle your product return data.
 */
const WooCommerceAPI = require('woocommerce-api');
const productsResponseFormatter = require("../../../../common/productsResponseFormatter")
const productResponseFormatter = require("../../../../common/productResponseFormatter")

module.exports = async function (config, name, obj) {
    // Instantiate our config...
    const platform = config.provider
    const direct = config.direct
    config = config.settings;

    const WooCommerce = new WooCommerceAPI({
        url: config.url,
        consumerKey: config.key,
        consumerSecret: config.secret,
        wpAPI: true,
        version: config.apiVersion
    });

    switch (name) {
    case 'products':
      return WooCommerce.getAsync("products")
        .then(async (res) => {
          return await productsResponseFormatter(JSON.parse(res.body), platform)
        })
        .catch(error => {
          return {
            success: false, 
            message: "Something went wrong"
          }
        })
    case 'product':
      return WooCommerce.getAsync("products/" + obj.id)
      .then(async (res) => {
        return await productResponseFormatter(JSON.parse(res.body), platform)
      })
      // .catch(error => {
      //   return {
      //     success: false, 
      //     message: "Something went wrong"
      //   }
      // })
    }
  };
  