const policy = require("../../../../api/distribution/config/policies/backup")

let findOne, create, query
query = findOne = create = jest.fn().mockReturnThis()

const fetch = jest.fn().mockReturnValue({
    distributions: [
        {
            id: 1
        }
    ]
});

global.strapi = {
    plugins: {
        "users-permissions": {
            services: {
                user: {
                    fetch
                }
            }
        }
    },
    query,
    create,
    findOne
}

describe("Distribution Backup", () => {
    test("Test Distribution Backup Policy", async () => {
        const response = await policy(
            {
                state: {
                    user: {
                        id: 1
                    }
                },
                params: {
                    id: 1
                }
            },
            async () => true
        )

        expect(response).toBe(true)
    })
})
