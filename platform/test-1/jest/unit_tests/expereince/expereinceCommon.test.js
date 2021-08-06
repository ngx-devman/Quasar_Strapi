const experienceCommon = require("../../../../api/experience/controllers/Experience-common");

describe("Experience Common", () => {
  test("Test Timer", async () => {
    const timer = await experienceCommon.timer();
    timer.start();
    expect(timer.end()).toEqual(expect.any(Number));
  });
});
