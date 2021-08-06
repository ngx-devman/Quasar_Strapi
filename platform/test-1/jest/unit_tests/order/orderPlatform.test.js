const magento = require("../../../../api/orders/platforms/magento")
const shopify = require("../../../../api/orders/platforms/shopify")
const woocommerce = require("../../../../api/orders/platforms/woocommerce")


const responseFormatter = require("../../../../common/orderResponseFormatter")

const WooCommerceAPI = require('woocommerce-api');

WooCommerceAPI.mockImplementation(() => {
    return {
        getAsync: jest.fn().mockResolvedValue({ body: '{}'}),
        postAsync: jest.fn().mockResolvedValue({ body: '{ "success": true }'}),
        putAsync: jest.fn().mockResolvedValue({ body: '{ "success": true }'})
    }
})

const axios = require("axios")

jest.mock("axios")
jest.mock("woocommerce-api")
jest.mock("../../../../common/orderResponseFormatter")

describe("Order Platforms", () => {
    responseFormatter.mockReturnValue({
        success: true
    })

    axios.get.mockResolvedValue({
        data: {
            success: true,
            payment_methods: [{ 
                code: "checkmo"
            }]
        }
    })

    axios.put.mockResolvedValue({
        data: {
            success: true
        }
    })

    axios.post.mockResolvedValue({
        data: {
            success: true
        }
    })


    describe("Shopify", () => {

        test("getOrder", async () => {
            const response = await shopify({ settings: {} }, "getOrder")

            expect(response.success).toBe(true)
        })


        test("updateOrder", async () => {
            const response = await shopify({ settings: {} }, "updateOrder", { data: { order_id: "123" } })

            expect(response.success).toBe(true)
        })


        test("createOrder", async () => {
            const response = await shopify({ settings: {} }, "createOrder", {})

            expect(response.success).toBe(true)
        })

        test("shopifyCreateOrder", async () => {
            const response = await shopify({ settings: {} }, "shopifyCreateOrder", {})

            expect(response.success).toBe(true)
        })
    })


    describe("WooCommerce", () => {
        test("getOrder", async () => {
            const response = await woocommerce({ settings: {} }, "getOrder")

            expect(response.success).toBe(true)
        })


        test("updateOrder", async () => {
            const response = await woocommerce({ settings: {} }, "updateOrder", { order_id: "123" })

            expect(response.success).toBe(true)
        })


        test("createOrder", async () => {
            const response = await woocommerce({ settings: {} }, "createOrder", {})

            expect(response.success).toBe(true)
        })
    })
    

    describe("Magento", () => {
        test("getOrder", async () => {
            const response = await magento({ settings: {} }, "getOrder")

            expect(response.success).toBe(true)
        })


        test("updateOrder", async () => {
            const response = await magento({ settings: {} }, "updateOrder", { order_id: "123" })

            expect(response.success).toBe(true)
        })


        test("createOrder", async () => {
            const response = await magento({ settings: {} }, "createOrder", {
                "config": {
                    "provider": "magento",
                    "settings": {
                      "token": "fb1mh74tp8nl70pckab1w0tmmnwt65ff",
                      "url": "https://magento.source.tools/rest/V1/"
                    }
                },
                "data": {
                    "cartItem": { 
                        "quote_id": "56241bf6bc084cd7589426c8754fc9c5", 
                        "sku": "11111",
                        "qty": 1 
                    }, 
                    "addressInformation": {
                        "shippingAddress": {
                            "region": "MH",
                            "region_id": 0,
                            "country_id": "IN",
                            "street": [
                                "Chakala,Kalyan (e)"
                            ],
                            "company": "abc",
                            "telephone": "1111111",
                            "postcode": "12223",
                            "city": "Mumbai",
                            "firstname": "Sameer",
                            "lastname": "Sawant",
                            "email": "abc@abc.com",
                            "prefix": "address_",
                            "region_code": "MH",
                            "sameAsBilling": 1
                        },
                        "billingAddress": {
                            "region": "MH",
                            "region_id": 0,
                            "country_id": "IN",
                            "street": [
                                "Chakala,Kalyan (e)"
                            ],
                            "company": "abc",
                            "telephone": "1111111",
                            "postcode": "12223",
                            "city": "Mumbai",
                            "firstname": "Sameer",
                            "lastname": "Sawant",
                            "email": "abc@abc.com",
                            "prefix": "address_",
                            "region_code": "MH"
                        },
                        "shipping_method_code": "flatrate",
                        "shipping_carrier_code": "flatrate"
                    }
                }
            })
            expect(response.success).toBe(true)
        })
    })
})
