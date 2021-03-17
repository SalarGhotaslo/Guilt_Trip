const Target = require("../src/Target");

describe("Target class", () => {
  let testTarget;
  beforeEach(() => {
    testTarget = new Target();
  });
  test("Target should by 5000 by default", () => {
    expect(testTarget.showTarget()).toBe(5000);
  });
});
