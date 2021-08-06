const getClientConfig = require("../../../../common/getClientConfig");
const orderResponseFormatter = require("../../../../common/orderResponseFormatter");
const productResponseFormatter = require("../../../../common/productResponseFormatter");
const productsResponseFormatter = require("../../../../common/productsResponseFormatter");

let findOne, query;

query = findOne = jest.fn().mockReturnThis();

global.strapi = {
  query,
  findOne,
};

describe("Common Utility", () => {
  test("Test getClientConfig", async () => {
    const response = await getClientConfig(1);
    expect(response.success).toBe(true);
  });

  test("Test orderResponseFormatter", async () => {
    const responseMagento = await orderResponseFormatter(
      {
        items: [
          {
            entity_id: 1,
            extension_attributes: {
              shipping_assignments: [{ shipping: {} }],
            },
            payment: {},
          },
        ],
      },
      "magento"
    );

    const responseWooCommerce = await orderResponseFormatter(
      [
        {
          id: 2,
          billing: {},
        },
      ],
      "wooCommerce"
    );

    expect(responseMagento.orders[0].id).toBe(1);
    expect(responseWooCommerce.orders[0].id).toBe(2);
  });

  test("Test productsResponseFormatter", async () => {
    const responseMagento = await productsResponseFormatter(
      {
        items: [
          {
            sku: 1,
          },
        ],
      },
      "magento"
    );

    const responseWooCommerce = await productsResponseFormatter(
      [
        {
          id: 2,
        },
      ],
      "wooCommerce"
    );

    expect(responseMagento.products[0].id).toBe(1);
    expect(responseWooCommerce.products[0].id).toBe(2);
  });

  test("Test productResponseFormatter", async () => {
    const responseMagento = await productResponseFormatter(
      {
        sku: 1,
        media_gallery_entries: [{}],
        options: [{ values: [{}] }],
        extension_attributes: {},
      },
      "magento"
    );

    const responseWooCommerce = await productResponseFormatter(
      {
        id: 2,
        images: [{}],
        variations: [{ attributes: [{}] }],
        attributes: [{}],
      },
      "wooCommerce"
    );

    const responseShopify = await productResponseFormatter({
      product: {
        id: 3,
        images: [{}],
        options: [{ values: "sample" }],
        variants: [{}],
      },
    });

    expect(responseMagento.product.id).toBe(1);
    expect(responseWooCommerce.product.id).toBe(2);
    expect(responseShopify.product.id).toBe(3);
  });
});
