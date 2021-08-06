const service = require("../../../../api/pulse/controllers/Pulse").create;

let create, find, update, query;

query = jest.fn().mockReturnThis();
create = find = update = jest.fn().mockReturnValue([
  {
    events: [
      { e: 4, d: { v: 1, s: 1.6 } },
      { e: 4, d: { v: 1, s: 1.6 } },
      { e: 3, d: { s: 1.6 } },
      { e: 14, d: { x: 727, y: 7, s: 1.9 } },
      { e: 14, d: { x: 740, y: 43, s: 2.2 } },
      { e: 0, d: { s: 150.4 } },
      { e: 14, d: { x: 971, y: 6, s: 152.7 } },
      { e: 14, d: { x: 992, y: 0, s: 153.3 } },
      { e: 0, d: { s: 570.7 } },
      { e: 23, d: { s: 571.9 } },
    ],
  },
]);

global.strapi = {
  query,
  create,
  find,
  update,
};

describe("Pulse Service", () => {
  test("Test Create Pulse", async () => {
    const response = await service({
      request: {
        body: {
          session: "ca09dc78-f44c-4540-8b57-3f15e4ece52c",
          events: [
            { e: 4, d: { v: 1, s: 1.7 } },
            { e: 4, d: { v: 1, s: 1.7 } },
            { e: 3, d: { s: 1.7 } },
            { e: 0, d: { s: 66.2 } },
            { e: 23, d: { s: 67 } },
          ],
          agent: {
            ip: "IP",
          },
        },
      },
    });

    expect(response.success).toBe(true);
  });
});
