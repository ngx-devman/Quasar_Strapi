const service = require("../../../../api/distribution/controllers/Distribution");

const util = require("strapi-utils");

jest.mock("strapi-utils");

let query, update;
query = update = jest.fn().mockReturnThis();

let findOne = jest.fn().mockResolvedValue({
  slug: "Sample-Slug",
  name: "Sample",
});

const fetch = jest.fn().mockReturnValue({
  distributions: [
    {
      id: 1,
    },
  ],
});

global.strapi = {
  plugins: {
    "users-permissions": {
      services: {
        user: {
          fetch,
        },
      },
    },
  },
  services: {
    distribution: {
      update,
    },
  },
  models: {
    distribution: "Model",
  },
  query,
  update,
  findOne,
};

describe("Distribution Service", () => {
  util.sanitizeEntity.mockReturnValue({
    success: true,
  });

  test("Test Distribution UpdateSettings (Multipart)", async () => {
    util.parseMultipartData.mockReturnValue({
      data: "Sample",
      files: "files",
    });

    const response = await service.updateSettings({
      is: () => true,
      request: {
        body: "Sample Data",
      },
    });

    expect(response.success).toBe(true);
  });

  test("Test Distribution UpdateSettings (JSON)", async () => {
    const response = await service.updateSettings({
      is: () => false,
      request: {
        body: "Sample Data",
      },
    });

    expect(response.success).toBe(true);
  });

  test("Test Distribution Copy", async () => {
    const response = await service.copy({
      state: {
        user: {
          id: 1,
        },
      },
      params: {
        from: 2,
        to: 1,
      },
    });

    expect(response.success).toBe(true);
  });

  test("Test Update Distribution", async () => {
    util.parseMultipartData.mockReturnValue({
      data: { smaple: "sample" },
      files: "files",
    });

    const response = await service.update({
      params: {
        id: 1,
      },
      is: () => true,
      request: {
        body: "Sample Data",
      },
    });

    expect(response.success).toBe(true);
  });
});
