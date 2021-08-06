const platform = require("../../../../api/taxrate/platform/taxrates");
const axios = require("axios");

jest.mock("axios");

test("Test Taxrate Platform", async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        country_name: "United States",
        taxes: [
          {
            Country: "United States",
            Type: "CombinedRate",
            data_name: "Rate",
            data_value: "6",
            State: "District of Columbia",
          },
          {
            Country: "United States",
            Type: "StateRate",
            data_name: "Rate",
            data_value: "6",
            State: "District of Columbia",
          },
        ],
      },
    ],
  });

  const response = await platform(null, {
    countryCode: "IN",
    productCode: "C022",
    amount: 100,
  });

  expect(response.success).toBe(true);
  expect(response.tax).toBe(6);
});
