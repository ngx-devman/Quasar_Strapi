const axios = require("axios")

let productID = null

describe("Product Service", () => {
    test("Test Get Products", async () => {
        const response = await axios.post("http://localhost:1337/products", {    
            "config": {
                  "provider": "magento",
                  "settings": {
                    "token": "fb1mh74tp8nl70pckab1w0tmmnwt65ff",
                    "url": "https://magento.source.tools/rest/V1/"
                  }
                }
          }
        )

        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("products")
    })


    test("Test Get A Product", async () => {
        const response = await axios.post("http://localhost:1337/products/11111", {    
            "config": {
                  "provider": "magento",
                  "settings": {
                    "token": "fb1mh74tp8nl70pckab1w0tmmnwt65ff",
                    "url": "https://magento.source.tools/rest/V1/"
                  }
                }
          }
        )

        expect(response.status).toBe(200)
    })
    
    test("Test Get Product Stock", async () => {
        const response = await axios.post("http://localhost:1337/stock/11111", {
            "config": {
                "direct": false,
                "provider": "magento",
                "settings": {
                  "token": "fb1mh74tp8nl70pckab1w0tmmnwt65ff",
                  "url": "https://magento.source.tools/rest/V1/"
                }
              }
        })
        
        expect(response.status).toBe(200)
        expect(response.data).toBeDefined()
    })
})