const axios = require("axios")

describe("Taxrates Service", () => {
    test("Test Get Taxrate for Other Countries", async () => {
        const response = await axios.post("http://localhost:1337/taxrates", 
            {
                "countryCode": "IN",
                "productCode": "C022",
                "amount": 100
            }
        )

        expect(response.status).toBe(200)
        expect(response.data.success).toBe(true)
        expect(Object.keys(response.data)).toContain("tax")
    })

    
    test("Test Get Taxrate for USA", async () => {
        const response = await axios.post("http://localhost:1337/taxrates", 
            {
                "countryCode": "US",
                "productCode": "C022",
                "zip": "20001",
                "amount": 100
            }
        )

        expect(response.status).toBe(200)
        expect(response.data.success).toBe(true)
        expect(Object.keys(response.data)).toContain("tax")
    })
})