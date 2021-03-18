import { updatePopulation } from "../src/updatePopulation";
import { Target } from "../src/Target";
const { Colony } = require("../src/Colony");

describe("updatePopulation function", () => {
  let testTarget, testColony, testSteps;
  beforeEach(() => {
    testTarget = new Target();
    testColony = new Colony();
  });
  test("if steps target is reached, colony population increases", () => {
    testSteps = 5000;
    updatePopulation(testTarget, testColony, testSteps);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(6);
  });
  test("if steps target is not reached, colony population decreases", () => {
    testSteps = 4999;
    updatePopulation(testTarget, testColony, testSteps);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(4);
  });
});
