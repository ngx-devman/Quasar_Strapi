const calculateOrderAmount = require("../../../../api/payments/utils/calculateOrderAmount")
const createTransactionObject = require("../../../../api/payments/utils/createTransactionObject")
const getPaymentConfig = require("../../../../api/payments/utils/getPaymentConfig")


let findOne, query;

findOne = jest.fn().mockResolvedValue({
    settings: {
        ecommerce: {
            storefronts: {
                stripe: {
                    storefrontId: 1
                }
            }
        }
    },
    items: [],
    id: 1
})

query = jest.fn().mockReturnThis();

global.strapi = {
  query,
  findOne,
  config: {
    get: () => "stripe"
  }
};

describe("Payment Utility", () => {
    test("Test calculateOrderAmount", async () => {
        const response = await calculateOrderAmount({
            items: [
                {
                    price: 100
                }
            ]
        })

        expect(response.success).toBe(true);
        expect(response.totalAmount).toBe(100);
    });

    test("Test createTransactionObject", async () => {
        const response = await createTransactionObject([{ id: 1 }], 100, 80, "USD")

        expect(response[0].item_list.items[0].name).toBe(1);
    });

    test("Test getPaymentConfig", async () => {
        const response = await getPaymentConfig({
            settings: {
                paymentMethod: "stripe"
            }
        })

        expect(response.success).toBe(true);
    });
})
