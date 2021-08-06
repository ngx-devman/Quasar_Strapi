const service = require("../../../../api/shortcode/controllers/Shortcode")
  .findOne;

const update = jest.fn().mockReturnValue({});
const find = jest.fn().mockReturnValue([
  {
    id: "123",
    counter: 3,
  },
]);

global.strapi = {
  services: {
    shortcode: {
      find,
      update,
    },
  },
};

describe("Shortcode Service", () => {
  test("Test Shortcode", async () => {
    const response = await service({
      params: {
        id: "123",
      },
    });

    expect(response.success).toBe(true);
  });
});
