
/**
 * In order to support any platform for ecommerce, we need to have this strategy router.
 * This is for Shopify. To add another one, just support the below methods.
 * 
 * Please look at how Shopify structures their products.  You must support that format
 * in order for the platform to be able to handle your product return data.
 */
const WooCommerceAPI = require('woocommerce-api');

const responseFormatter = require("../../../../common/orderResponseFormatter")

module.exports = async function (config, name, obj) {

    const platform = config.provider
    config = config.settings;
    
    const WooCommerce = new WooCommerceAPI({
        url: config.url,
        consumerKey: config.key,
        consumerSecret: config.secret,
        wpAPI: true,
        version: 'wc/v1'
    });
    
    switch (name) {
    case 'createOrder':
      return await WooCommerce.postAsync("orders", obj.data)
        .then(res => {
          return JSON.parse(res.body)
        })
        .catch(error => {
          return {
            success: false, 
            message: "Something went wrong"
          }
        })
    case 'getOrder':
      return await WooCommerce.getAsync("orders/")
      .then(res => {
        return responseFormatter(JSON.parse(res.body), platform)
      })
      .catch(error => {
        return {
          success: false, 
          message: "Something went wrong"
        }
      })
      case 'updateOrder':
        return await WooCommerce.putAsync("orders/" + obj.order_id, obj.data)
        .then(res => {
          return JSON.parse(res.body)
        })
        .catch(error => {
          console.log(error)
          return {
            success: false, 
            message: "Something went wrong"
          }
        })
    }
  };
  