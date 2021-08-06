/**
 * In order to support any platform for ecommerce, we need to have this strategy router.
 * This is for Shopify. To add another one, just support the below methods.
 *
 * Please look at how Shopify structures their orders.  You must support that format
 * in order for the platform to be able to handle your order return data.
 */

const axios = require("axios")

module.exports = async function(config, name, obj) {
    
  const platform = config.provider
  config = config.settings;
  
  const baseURL = `https://${config.user}:${config.pass}@${config.store}.myshopify.com/admin/api/2019-07`;

    switch (name) {
      case 'getOrder':
        
        try {
          return await axios.get(baseURL + "/draft_orders.json")
          .then(async (res) => {
              return res.data
          })    
          .catch(error => {
              return {
                  success: false, 
                  message: "Something went wrong"
              }
          })
        } catch (e) {
          return {
            success: false,
            error: e
          }
        }

      case 'updateOrder':
          try {
            return await axios.put(`${baseURL}/draft_orders/${obj.data.order_id}.json`, obj.data)
            .then(async (res) => {
                return res.data
            })    
            .catch(error => {
                return {
                    success: false, 
                    message: "Something went wrong"
                }
            })
          } catch (e) {
            return {
              success: false,
              error: e
            }
          }
      case 'createOrder':
        
          try {
            return await axios.post(baseURL + "/draft_orders.json", obj.data)
            .then(async (res) => {
                return res.data
            })    
            .catch(error => {
                return {
                    success: false, 
                    message: "Something went wrong"
                }
            })
          } catch (e) {
            return {
              success: false,
              error: e
            }
          }
  
      case 'shopifyCreateOrder':

          try {
            return await axios.post(baseURL + "/orders.json", obj.data)
            .then(async (res) => {
                return res.data
            })    
            .catch(error => {
                return {
                    success: false, 
                    message: "Something went wrong"
                }
            })
          } catch (e) {
            return {
              success: false,
              error: e
            }
          }
  
    }
  };