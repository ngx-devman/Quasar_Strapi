const controller = require("../../../../api/cart/controllers/cart")
const addUserInfo = require("../../../../api/cart/config/policies/addUserInfo")
const isAuthorized = require("../../../../api/cart/config/policies/isAuthorized")
const validateUser = require("../../../../api/cart/config/policies/validateUser")

const util = require("strapi-utils");

jest.mock("strapi-utils")

let query = jest.fn().mockReturnThis()

let findOne = jest.fn().mockResolvedValue({
    user: {
        id: 1
    }
});

let find = jest.fn().mockResolvedValue([{
    success: true
}])

global.strapi = {
    models: {
        cart: "Model"
    },
    query,
    find,
    findOne
}

describe("Cart Service", () => {
    
    util.sanitizeEntity.mockReturnValue({
        success: true
    })

    test("Test Cart Controller", async () => {

        const response = await controller.find({
            state: {
                user: { id: 1 }
            }
        })

        expect(response[0].success).toBe(true)
    })
    
    test("Test Cart Policy - addUserInfo", async () => {
        const response = await addUserInfo(
            {
                state: {
                    user: { id: 1 }
                },
                request: {
                    body: {
                        smaple: "sample"
                    }
                }
            },
            () => true
        )

        expect(response).toBe(true)
    })

    test("Test Cart Policy - isAuthorized", async () => {
        const response = await isAuthorized(
            {
                state: {
                    user: { id: 1 }
                }
            },
            () => true
        )

        expect(response).toBe(true)
    })

    test("Test Cart Policy - validateUser", async () => {
        const response = await validateUser(
            {
                state: {
                    user: { id: 1 }
                },
                params: {
                    id: 2
                }
            },
            () => true
        )

        expect(response).toBe(true)
    })
})
