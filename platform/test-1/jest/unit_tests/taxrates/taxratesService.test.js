const service = require("../../../../api/taxrate/controllers/Taxrate")
  .calculate;

jest.mock("../../../../api/taxrate/platform/taxrates/");

const platform = {
  taxrates: require("../../../../api/taxrate/platform/taxrates"),
};

test("Test Taxrate Service", async () => {
  platform["taxrates"].mockReturnValue({
    success: true,
    tax: 6,
  });

  let get = jest.fn().mockReturnValue("sampleKey");

  global.strapi = {
    config: {
      get,
    },
  };

  const response = await service({
    request: {
      body: {
        countryCode: "IN",
        productCode: "C022",
        amount: 100,
      },
    },
  });

  expect(response.success).toBe(true);
  expect(response.tax).toBe(6);
});
