const axios = require("axios")

describe("Shortcode Service", () => {
    test("Test Get Shortcode", async () => {
        const response = await axios.get("http://localhost:1337/shortcodes/RNdkxX")

        expect(response.status).toBe(200)
        expect(response.data.success).toBe(true)
    })
})