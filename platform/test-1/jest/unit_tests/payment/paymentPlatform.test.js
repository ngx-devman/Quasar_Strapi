const stripePlatform = require("../../../../api/payments/platforms/stripe")
const paypalPlatform = require("../../../../api/payments/platforms/paypal")


const paypal = require('paypal-rest-sdk');
const Stripe = require('stripe');
const calculateOrderAmount = require("../../../../api/payments/utils/calculateOrderAmount")
const createTransactionObject = require("../../../../api/payments/utils/createTransactionObject")

jest.mock("paypal-rest-sdk")
jest.mock("stripe")
jest.mock("../../../../api/payments/utils/calculateOrderAmount")
jest.mock("../../../../api/payments/utils/createTransactionObject")


let findOne, update, query;

query = jest.fn().mockReturnThis();

findOne = update = jest.fn().mockResolvedValue({
    settings: {
        currency: "USD",
        sourceCode: {
            environment: "local"
        },
        sourceCodeApi: {
            environment: "local"
        }
    }
})

global.strapi = {
  query,
  update,
  findOne,
  config: {
      get: () => true
  }
};

describe("Payment Platforms", () => {
    calculateOrderAmount.mockResolvedValue({
        success: true,
        totalAmount: 100,
        subTotal: 80
    })

    createTransactionObject.mockReturnValue([{
        sample: "sample"
    }])

    test("Stripe", async () => {
        Stripe.mockReturnValue({
            paymentIntents: {
                create: jest.fn(async () => {
                    return {
                        client_secret: "secret"
                    }
                })
            }
        })

        const response = await stripePlatform({ secret_key: "key" }, { 
            paymentMethodId: "sample",
            cart: {
                id: 1
            },
            currency: "USD"
        })

        expect(response.success).toBe(true)
    })


    test("Paypal", async () => {
        paypal.payment.create = jest.fn((data, cb) => {
            return cb(false, {
                links: [
                    {
                        rel: "approval_url",
                        href: "sample"
                    }
                ]
            })
        })
        const response = await paypalPlatform({ secret_key: "key" }, {
            cart: {
                id: 1,
                items: [],
                settings: {}
            },
            currency: "USD"
        })

        expect(response.success).toBe(true)
    })
})
