const service = require("../../../../api/payments/controllers/Payments")


const paypal = require('paypal-rest-sdk');
const calculateOrderAmount = require("../../../../api/payments/utils/calculateOrderAmount")
const createTransactionObject = require("../../../../api/payments/utils/createTransactionObject")
const getPaymentConfig = require("../../../../api/payments/utils/getPaymentConfig")

jest.mock("paypal-rest-sdk")
jest.mock("../../../../api/payments/utils/calculateOrderAmount")
jest.mock("../../../../api/payments/utils/createTransactionObject")
jest.mock("../../../../api/payments/utils/getPaymentConfig")
jest.mock("../../../../api/payments/platforms/stripe/")

const platform = { 
    stripe: require('../../../../api/payments/platforms/stripe')
}

let findOne, update, query;

findOne = update = jest.fn().mockResolvedValue({
    settings: {
        currency: "USD",
        sourceCode: {
            environment: "local"
        }
    },
    items: [],
    id: 1
})

query = jest.fn().mockReturnThis();

global.strapi = {
  query,
  findOne,
  update,
  config: {
      get: () => []
  }
};

describe("Payment Service", () => {

    platform["stripe"].mockReturnValue({
        success: true
    })

    getPaymentConfig.mockResolvedValue({
        success: true,
        config: {
            secret_key: "key"
        },
        paymentMethod: "stripe"
    })

    calculateOrderAmount.mockResolvedValue({
        success: true,
        totalAmount: 100,
        subTotal: 80
    })

    createTransactionObject.mockReturnValue([{
        sample: "sample"
    }])

    test("Test Create Payment", async () => {
        const response = await service.create({
            params: {
                platform: "stripe"
            },
            request: {
                body: {
                    cartID: 1
                }
            }
        })
        expect(response.success).toBe(true);
    });

    test("Test Payment Success", async () => {
        paypal.configure.mockReturnValue(true)
        paypal.payment.execute = jest.fn((data_1, data_2, cb) => {
            return cb(false, "sample")
        })

        const response = await service.paymentsuccess({
            request: {
                query: {
                    currency: "USD",
                    cartID: 1,
                    PayerID: 1,
                    paymentId: 1
                }
            },
            response: {
                redirect: () => {
                    return {
                        success: true
                    }
                }
            }
        })
        expect(response.success).toBe(true);
    });

    test("Test Payment Cancel", async () => {
        const response = await service.paymentcancel({
            request: {
                query: {
                    currency: "USD",
                    cartID: 1,
                    PayerID: 1,
                    paymentId: 1
                }
            },
            response: {
                redirect: () => {
                    return {
                        success: true
                    }
                }
            }
        })
        expect(response.success).toBe(true);
    });
})
