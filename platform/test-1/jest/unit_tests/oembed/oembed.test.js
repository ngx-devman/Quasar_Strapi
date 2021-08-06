const mql = require("@microlink/mql");
const service = require("../../../../api/oembed/controllers/oembed").getData;

jest.mock("@microlink/mql");

let findOne, query;

findOne = jest.fn().mockResolvedValue({
  settings: {
    sourceCode: {
      environment: "local",
    },
  },
});

query = jest.fn().mockReturnThis();

global.strapi = {
  query,
  findOne,
  config: {
    get: () => ({ local: "demoURL" }),
  },
};

describe("Oembed Service", () => {
  mql.mockResolvedValue({
    data: {
      success: true,
    },
  });
  test("Test getData", async () => {
    const response = await service({
      params: {
        identifier: 1,
      },
    });

    expect(response.success).toBe(true);
  });
});
