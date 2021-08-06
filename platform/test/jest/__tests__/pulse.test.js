const axios = require("axios")

describe("Pulse Service", () => {
    test("Test Pulse Create Session", async () => {
        const response = await axios.post("http://localhost:1337/pulses", {
            session: "ef439b01-4d5f-9979-e93b-eb3627d84932",
            distribution: 24,
            user: 1,
            events: [{"e":14,"d":{"x":223,"y":373,"s":390.4}},{"e":14,"d":{"x":456,"y":418,"s":390.6}},{"e":14,"d":{"x":526,"y":689,"s":391}},{"e":13,"d":{"x":526,"y":689,"s":391.1}},{"e":14,"d":{"x":526,"y":688,"s":391.3}},{"e":14,"d":{"x":529,"y":668,"s":391.6}},{"e":4,"d":{"v":0.05,"s":0.8}},{"e":4,"d":{"v":0.05,"s":0.8}},{"e":3,"d":{"s":0.8}},{"e":0,"d":{"s":null}},{"e":0,"d":{"s":null}},{"e":0,"d":{"s":null}},{"e":0,"d":{"s":null}},{"e":14,"d":{"x":816,"y":198,"s":null}},{"e":14,"d":{"x":0,"y":536,"s":null}},{"e":0,"d":{"s":null}},{"e":14,"d":{"x":476,"y":235,"s":null}},{"e":0,"d":{"s":null}}]
        })

        expect(response.status).toBe(200)
        expect(response.data.success).toBe(true)
    })
})