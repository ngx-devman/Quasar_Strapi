const experienceMethod = require("../../../../api/experience/controllers/Experience-method");
const axios = require("axios");

let findOne, query;

findOne = jest.fn().mockReturnValue({
  settings: {
    credits: [
      {
        creditType: "Cast",
      },
    ],
    studios: [
      {
        name: "NBC",
      },
    ],
    slug: "demo_movie_slug",
  },
});

query = jest.fn().mockReturnThis();

global.strapi = {
  query,
  findOne,
};

jest.mock("axios");

axios.mockResolvedValue({
  data: {
    0: {
      success: true,
      "Offer ID": 1,
      "SKU Type [Single, Bundle, Choice]": "Single",
      title: [
        {
          EIDR: "1111",
          Genre: "Action",
          Runtime: "1:45",
          "Box Art": "image",
          "Hero Image": "image.jpg",
        },
      ],
    },
  },
});

describe("Experience Method", () => {
  test("Test Experience Method (proxy)", async () => {
    const response = await experienceMethod(
      {
        params: {
          name: "sample",
        },
      },
      {
        config: {
          data: {
            distribution: {
              hidden: {
                methods: {
                  sample: {
                    type: "proxy",
                    settings: {
                      method: "sample",
                    },
                  },
                },
              },
            },
          },
        },
      }
    );
    expect(response["0"].success).toBe(true);
  });

  test("Test Experience Method (map)", async () => {
    const response = await experienceMethod(
      {
        params: {
          name: "sample",
        },
      },
      {
        config: {
          data: {
            distribution: {
              hidden: {
                methods: {
                  sample: {
                    type: "map",
                    settings: {
                      method: "sample",
                    },
                  },
                },
              },
            },
          },
        },
      }
    );
    expect(response[0].id).toBe(1);
  });
});
