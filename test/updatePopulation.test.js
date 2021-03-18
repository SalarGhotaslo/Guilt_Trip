import { updatePopulation } from "../src/updatePopulation";
import { Target } from "../src/Target";
import { Colony } from "../src/Colony";

describe("updatePopulation function", () => {
  let testTarget, testColony, testSteps;
  beforeEach(() => {
    testTarget = new Target();
    testColony = new Colony();
  });
  xtest("if steps target is reached, colony population increases", () => {
    testSteps = 5000;
    updatePopulation(testTarget, testColony, testSteps);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(6);
  });
  xtest("if steps target is not reached, colony population decreases", () => {
    testSteps = 4999;
    updatePopulation(testTarget, testColony, testSteps);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(4);
  });
  test("it increase by 3 when target is met 3 days in a row", () => {
    let threeDaysAgo = new Date();
    threeDaysAgo.setHours(0, 0, 0, 0);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    console.log(threeDaysAgo);
    updatePopulation(testTarget, testColony, threeDaysAgo);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(8);
  });
});
