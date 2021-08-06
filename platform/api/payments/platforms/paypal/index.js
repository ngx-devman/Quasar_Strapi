
const paypal = require('paypal-rest-sdk');

const calculateOrderAmount = require("../../utils/calculateOrderAmount")
const createTransactionObject = require("../../utils/createTransactionObject")

/* eslint-disable no-unused-vars */

/**
 * In order to support any platform for payments, we need to have this strategy router.
 * This is for Stripe. To add another one, just support the below methods.
 *
 */


module.exports = async function(config, data) {
    try {
        paypal.configure(config);

        const { cart, currency } = data

        const result = await calculateOrderAmount(cart)
        
        if(!result.success || result.totalAmount == 0) {
            return {
              success: false,
              error: result.message
            }
        }

        const distribution = await strapi.query("distribution").findOne({ id: cart.settings.distributionID })

        const transactions = createTransactionObject(cart.items, result.totalAmount, result.subTotal, currency)

        const create_payment_json = {
            'intent': 'sale',
            'payer': {
            'payment_method': 'paypal'
            },
            'redirect_urls': {
            'return_url': `${strapi.config.get("custom.environments.back")[distribution.settings.sourceCodeApi.environment]}/paymentsuccess?cartID=${cart.id}&currency=${currency}`,
            'cancel_url':  `${strapi.config.get("custom.environments.back")[distribution.settings.sourceCodeApi.environment]}/paymentcancel?cartID=${cart.id}`
            },
            'transactions': transactions
        };

        const createPayment = () => new Promise((resolve, reject) => {
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    reject(error);
                } else {
                    for(let i = 0; i < payment.links.length; i++) {
                        if(payment.links[i].rel === 'approval_url') {
                            resolve(payment.links[i].href);
                        }
                    }
                }
            });
        });

        const approvalURL = await createPayment();
        if(approvalURL) {
            return {
                success: true,
                approvalURL
            };
        }
    } catch(e) {
        console.log(e)
        return {
            success: false,
            error: e
        };
    }
};