const service = require("../../../../api/orders/controllers/Orders");
const getClientConfig = require("../../../../common/getClientConfig");

jest.mock("../../../../api/orders/platforms/shopify");
jest.mock("../../../../common/getClientConfig");

const platform = {
  shopify: require("../../../../api/orders/platforms/shopify"),
};

describe("Orders Service", () => {
  platform["shopify"].mockReturnValue({
    success: true,
  });

  getClientConfig.mockResolvedValue({
    success: true,
    provider: "shopify",
  });

  test("Test Get Orders", async () => {
    const response = await service.findOne({
      request: {
        body: {
          distributionID: 1,
        },
      },
    });
    expect(response.success).toBe(true);
  });

  test("Test Create Order", async () => {
    const response = await service.create({
      request: {
        body: {
          distributionID: 1,
        },
      },
      params: "Sample",
    });
    expect(response.success).toBe(true);
  });

  test("Test Update Order", async () => {
    const response = await service.update({
      request: {
        body: {
          distributionID: 1,
          data: {
            order_id: "123",
          },
        },
      },
      params: "Sample",
    });
    expect(response.success).toBe(true);
  });

  test("Test Shopify Create Order", async () => {
    const response = await service.shopifyCreateOrder({
      request: {
        body: {
          distributionID: 1,
        },
      },
      params: "Sample",
    });
    expect(response.success).toBe(true);
  });
});
