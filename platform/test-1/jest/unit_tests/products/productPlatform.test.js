const magento = require("../../../../api/products/platforms/magento");
const shopify = require("../../../../api/products/platforms/shopify");
const woocommerce = require("../../../../api/products/platforms/woocommerce");

const productsResponseFormatter = require("../../../../common/productsResponseFormatter");
const productResponseFormatter = require("../../../../common/productResponseFormatter");
const responseFormatter = require("../../../../common/productResponseFormatter");

const WooCommerceAPI = require("woocommerce-api");

WooCommerceAPI.mockImplementation(() => {
  return {
    getAsync: jest.fn().mockResolvedValue({ body: '{ "stock_quantity": 2 }' }),
  };
});

const axios = require("axios");

jest.mock("axios");
jest.mock("woocommerce-api");
jest.mock("../../../../common/productsResponseFormatter");
jest.mock("../../../../common/productResponseFormatter");

describe("Product Platforms", () => {
  productResponseFormatter.mockReturnValue({
    success: true,
  });

  productsResponseFormatter.mockReturnValue({
    success: true,
  });

  responseFormatter.mockReturnValue({
    success: true,
  });

  axios.get.mockResolvedValue({
    data: {
      extension_attributes: {
        stock_item: {
          qty: 2,
        },
      },
      product: {
        variants: [
          {
            inventory_quantity: 2,
          },
        ],
      },
      success: true,
    },
  });

  describe("Shopify", () => {
    test("Products", async () => {
      const response = await shopify({ settings: {} }, "products");

      expect(response.success).toBe(true);
    });

    test("Product", async () => {
      const response = await shopify({ settings: {} }, "product", {});

      expect(response.success).toBe(true);
    });
  });

  describe("WooCommerce", () => {
    test("Products", async () => {
      const response = await woocommerce({ settings: {} }, "products");

      expect(response.success).toBe(true);
    });

    test("Product", async () => {
      const response = await woocommerce(
        { direct: true, settings: {} },
        "product",
        {}
      );

      expect(response.success).toBe(true);
    });
  });

  describe("Magento", () => {
    test("Products", async () => {
      const response = await magento({ settings: {} }, "products");

      expect(response.success).toBe(true);
    });

    test("Product", async () => {
      const response = await magento(
        { direct: true, settings: {} },
        "product",
        {}
      );

      expect(response.success).toBe(true);
    });
  });
});
