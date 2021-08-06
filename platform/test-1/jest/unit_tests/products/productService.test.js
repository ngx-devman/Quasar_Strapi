const service = require("../../../../api/products/controllers/Products");
const getClientConfig = require("../../../../common/getClientConfig");

jest.mock("../../../../api/products/platforms/shopify/");
jest.mock("../../../../common/getClientConfig");

const platform = {
  shopify: require("../../../../api/products/platforms/shopify"),
};

describe("Product Service", () => {
  platform["shopify"].mockReturnValue({
    success: true,
  });

  getClientConfig.mockResolvedValue({
    success: true,
    provider: "shopify",
  });

  test("Test Get A Product", async () => {
    const response = await service.getAProduct({
      params: {
        productId: 1,
        storefrontId: 1,
      },
    });
    expect(response.success).toBe(true);
  });
});
