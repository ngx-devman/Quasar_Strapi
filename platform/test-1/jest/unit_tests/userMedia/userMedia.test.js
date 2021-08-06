const service = require("../../../../api/user-media/controllers/user-media")

const util = require("strapi-utils");

jest.mock("strapi-utils")

let create, findOne, update

create = jest.fn().mockReturnThis()

findOne = update = jest.fn().mockReturnValue({
    files: [
        {
            mime: "application/docx",
        },
        {
            mime: "audio/mp3"
        }
    ]
});

global.strapi = {
    services: {
        "user-media": {
            findOne,
            create,
            update
        }
    },
    models: {
        "user-media": "Model"
    }
}

describe("User Media Service", () => {
    test("Test Add Media", async () => {
        util.parseMultipartData.mockResolvedValue({
            files: "files"
        })

        util.sanitizeEntity.mockResolvedValue({
            success: true
        })

        const response = await service.addMedia({
            is: () => true,
            state: {
                user:{
                    id: "123"
                }
            }
        })

        expect(response.success).toBe(true)
    })

    test("Test Find Media", async () => {
        const response = await service.find({
            query: {
                type: "audio"
            },
            state: {
                user:{
                    id: "123"
                }
            }
        })

        expect(response.success).toBe(true)
        expect(response.totalItems).toBe(1)
        expect(response.files[0].mime).toBe("audio/mp3")
    })
})
