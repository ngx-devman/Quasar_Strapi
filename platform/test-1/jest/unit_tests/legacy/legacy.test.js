const service = require("../../../../api/legacy/controllers/Legacy")
  .importLegacy;

let create, findOne, update, query;

create = findOne = update = query = jest.fn().mockReturnThis();

global.strapi = {
  query,
  create,
  findOne,
  update
};

describe("Legacy Service", () => {
  test("Test Create Legacy", async () => {
    const response = await service({
      request: {
        body: {
          settings: {},
          data: [],
          authKey: "platform-legacy",
        },
      },
    });

    expect(response.success).toBe(true);
  });

  test("Test Update Legacy", async () => {
    const response = await service({
      request: {
        body: {
          settings: {
            distributionId: 1,
          },
          data: [],
          authKey: "platform-legacy",
        },
      },
    });

    expect(response.success).toBe(true);
  });
});
