import { AppLogic } from "../src/AppLogic";
const Target = require("../src/Target");
const { Colony } = require("../src/colony");

describe("AppLogic function", () => {
  let testTarget, testColony, testSteps;
  beforeEach(() => {
    testTarget = new Target();
    testColony = new Colony();
  });
  test("if steps target is reached, colony population increases", () => {
    testSteps = 5000;
    AppLogic(testTarget, testColony, testSteps);
    expect(testColony.showPopulation()).toBe(6);
  });
});
