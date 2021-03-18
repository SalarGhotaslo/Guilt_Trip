import { updatePopulation } from "../src/updatePopulation";
import { Target } from "../src/Target";
import { Colony } from "../src/Colony";

describe("updatePopulation function", () => {
  let testTarget, testColony, testSteps;
  beforeEach(() => {
    testTarget = new Target();
    testColony = new Colony();
  });

  xtest("it increase by 3 when target is met 3 days in a row", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let threeDaysAgo = new Date();
    threeDaysAgo.setHours(0, 0, 0, 0);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    console.log(threeDaysAgo);
    // const performStepApiMock = jest.fn().mockReturnValue(5000);
    // updatePopulation.performStepApi = performStepApiMock
    updatePopulation(testTarget, testColony, threeDaysAgo, today);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(8);

  });
});
