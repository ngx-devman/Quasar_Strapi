const axios = require("axios")

let orderID = null

describe("Order Service", () => {
    test("Test Get Orders", async () => {
        const response = await axios.post("http://localhost:1337/orders/fetch", {
            "config": {
               "provider": "magento",
               "settings": {
                 "token": "fb1mh74tp8nl70pckab1w0tmmnwt65ff",
                 "url": "https://magento.source.tools/rest/V1/"
               }
             }
        })

        expect(response.status).toBe(200)
    })


    test("Test Create Order", async () => {
        const response = await axios.post("http://localhost:1337/orders/101", {
            "draft_order": {
              "line_items": [
                    {
                        "title": "Custom Tee",
                        "price": "20.00",
                        "quantity": 2
                    }
                ]
            }
        })

        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("draft_order")

        orderID = response.data.draft_order.id
    })

    test("Test Update Order", async () => {
        const response = await axios.put("http://localhost:1337/orders/101", {
            "draft_order": {
                "line_items": [
                    {
                        "title": "Custom Tee",
                        "price": "20.00",
                        "quantity": 2
                    }
                ]
            },
            "order_id": orderID
        })
        
        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("draft_order")
        expect(response.data.draft_order.id).toBe(orderID)
    })

    test("Test Create Shopify Order", async () => {
        const response = await axios.post("http://localhost:1337/orders/create/101", {
            "order": {
              "line_items": [
                {
                  "title": "Custom Tee",
                  "price": "20.00",
                  "quantity": 2
                }
              ]
            }
        })
        
        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("order")
    })
})