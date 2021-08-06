
var axios = require('axios');

const responseFormatter = require("../../../../common/orderResponseFormatter")

module.exports = async function (config, name, obj) {
    const platform = config.provider
    config = config.settings;
    
    const headers = {
        headers: {'Authorization': "bearer " + config.token}
    };

    switch (name) {
        case 'createOrder':
                try {
                    const cartID = (await axios.post(config.url + "guest-carts/", null, headers)).data
                    await axios.get(config.url + "guest-carts/" + cartID, headers)
                    const data = { cartItem: { ...obj.data.cartItem, quote_id: cartID }}
                    const cart = await axios.post(config.url + "guest-carts/" + cartID + "/items", data, headers)
                    await axios.post(config.url + `guest-carts/${cartID}/shipping-information`, obj.data.addressInformation, headers)
                    const paymentMethod = (await axios.get(config.url + `guest-carts/${cartID}/payment-information`, headers)).data.payment_methods[0]
                    const orderID = (await axios.put(config.url + `guest-carts/${cartID}/order`, { paymentMethod: { method: paymentMethod.code }}, headers)).data
                    return {
                        success: true,
                        message: "Order created successfully!",
                        orderID
                    }
                } catch(e) {
                    return {
                        success: false, 
                        message: "Something went wrong",
                        error: e
                    }
                }
        case 'getOrder':
            return await axios.get(config.url + "orders/?searchCriteria", headers)
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
        case 'updateOrder':
            return await axios.put(config.url + "orders/" + obj.order_id, obj.data, headers)
            .then((res) => {
                return res.data
            })    
            .catch(error => {
                console.log(error.response.data)
                return {
                    success: false, 
                    message: "Something went wrong",
                    error
                }
            })
    }
  };
  