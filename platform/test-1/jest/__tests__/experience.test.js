const axios = require("axios")

describe("Experience Service", () => {
    test("Test Get Expereince", async () => {
        const response = await axios.get("http://localhost:1337/experience/1")

        expect(response.status).toBe(200)
        expect(response.data.success).toBe(true)
    })
})