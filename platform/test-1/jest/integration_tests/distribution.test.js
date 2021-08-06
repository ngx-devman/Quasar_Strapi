const axios = require("axios")

describe("Distribution Service", () => {
    test("Test Get Distribution", async () => {
        const response = await axios.put("http://localhost:1337/updateDistributionsSetting/101", {
            name: "Demo - Ecommerce"
        })
        

        expect(response.status).toBe(200)
        expect(response.data.id).toBe(101)
    })
})