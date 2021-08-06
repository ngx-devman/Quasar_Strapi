
const axios = require('axios');
const productsResponseFormatter = require("../../../../common/productsResponseFormatter")
const productResponseFormatter = require("../../../../common/productResponseFormatter")

module.exports = async function (config, name, obj) {
    // Instantiate our config...
    const platform = config.provider
    const direct = config.direct
    config = config.settings;

    const headers = {
        headers: {'Authorization': "bearer " + config.token}
    };

    switch (name) {
        case 'products':
            return await axios.get(config.url + "products?searchCriteria", headers)
            .then(async (res) => {
                return await productsResponseFormatter(res.data, platform)
            })    
            .catch(error => {
                return {
                    success: false, 
                    message: "Something went wrong"
                }
            })
        case 'product':
            return await axios.get(config.url + "products/" + obj.id, headers)
            .then(async (res) => {
                return await productResponseFormatter(res.data, platform)
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
  