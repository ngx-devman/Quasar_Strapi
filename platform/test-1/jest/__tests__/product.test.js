const axios = require("axios")

let productID = null

describe("Product Service", () => {
    test("Test Get Products", async () => {
        const response = await axios.get("http://localhost:1337/products?client=verteluxe")

        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("products")

        productID = response.data.products[0].id
    })


    test("Test Get A Product", async () => {
        const response = await axios.get("http://localhost:1337/products/verteluxe?id=" + productID)

        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("product")
    })
    
    test("Test Get Product Stock", async () => {
        const response = await axios.get("http://localhost:1337/stock/verteluxe/" + productID)
        
        expect(response.status).toBe(200)
        expect(response.data).toBeDefined()
    })
})