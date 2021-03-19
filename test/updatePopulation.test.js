import { updatePopulation } from "../src/updatePopulation";
import { Target } from "../src/Target";
import { Colony } from "../src/Colony";

describe("updatePopulation function", () => {
  let testTarget, testColony, threeDaysAgo, today;
  beforeEach(() => {
    testTarget = new Target();
    testColony = new Colony();
    today = new Date();
  });

  test("it increase by 3 when target is met 3 days in a row", async () => {
    today.setHours(0, 0, 0, 0);
    threeDaysAgo = new Date();
    threeDaysAgo.setHours(0, 0, 0, 0);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const mockGetStepCountFn = jest.fn().mockResolvedValue(5000);
    const resolvedStepCount = await mockGetStepCountFn();
    const mockUpdatePopFn = jest.fn((target, colony, lastLogin, today) => {
      while (today.getTime() > lastLogin.getTime()) {
        const range = lastLogin;
        range.setDate(range.getDate() + 1);
        target.isReached(resolvedStepCount)
          ? colony.addCreature()
          : colony.killCreature();
        lastLogin = range;
      }
    });
    mockUpdatePopFn(testTarget, testColony, threeDaysAgo, today);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(8);
  });
});
