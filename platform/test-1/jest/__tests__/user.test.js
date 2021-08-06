const axios = require("axios")

let jwt = null

describe("User Service", () => {
    test("Test User Registration", async () => {
        const response = await axios.post("http://localhost:1337/auth/local/register", {
            username: "demo",
            email: "demo@demo.com",
            password: "demo"
        })

        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("user")
        expect(Object.keys(response.data)).toContain("jwt")

        jwt = response.data.jwt
    })

    test("Test User Shipping", async () => {
        const response = await axios.post("http://localhost:1337/user/shipping", {
            userShipping: {
                name: "demo"
            }
        }, {
            headers: {
               'Authorization': 'Bearer ' + jwt
            }          
        })

        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("userShipping")
    })


    test("Test User Billing", async () => {
        const response = await axios.post("http://localhost:1337/user/billing", {
            userBilling: {
                name: "demo"
            }
        }, {
            headers: {
               'Authorization': 'Bearer ' + jwt
            }          
        })

        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("userBilling")
    })

    test("Test User Info", async () => {
        const response = await axios.get("http://localhost:1337/user/info", {
            headers: {
               'Authorization': 'Bearer ' + jwt
            }          
        })

        expect(response.status).toBe(200)
        expect(Object.keys(response.data)).toContain("id")
    })


    test("Test Change User Password", async () => {
        const response = await axios.post("http://localhost:1337/user/password", {
            password: "pass"
        }, {
            headers: {
               'Authorization': 'Bearer ' + jwt
            }          
        })
        expect(response.status).toBe(200)
    })
})