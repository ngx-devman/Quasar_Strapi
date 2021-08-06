
/**
 * In order to support any platform for ecommerce, we need to have this strategy router.
 * This is for Shopify. To add another one, just support the below methods.
 * 
 * Please look at how Shopify structures their products.  You must support that format
 * in order for the platform to be able to handle your product return data.
 */

const axios = require("axios")
const responseFormatter = require("../../../../common/productResponseFormatter")

module.exports = async function (config, name, obj) {
    // Instantiate our config...
    const platform = config.provider
    config = config.settings;
        
    const baseURL = `https://${config.user}:${config.pass}@${config.store}.myshopify.com/admin/api/2020-07/products`;
    
    switch (name) {
        case 'products':
            return await axios.get(baseURL + ".json")
            .then(async (res) => {
                return await responseFormatter(res.data, platform)
            })    
            .catch(error => {
                return {
                    success: false, 
                    message: "Something went wrong",
                    error
                }
            })
        case 'product':
            return await axios.get(`${baseURL}/${obj.id}.json`)
            .then(async (res) => {
                return responseFormatter(res.data, platform)
            })    
            .catch(error => {
                return {
                    success: false, 
                    message: "Something went wrong",
                    error
                }
            })
    }
};
  