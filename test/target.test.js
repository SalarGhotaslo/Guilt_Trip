import { Target } from "../src/Target";
import { Pedometer } from "expo-sensors";
import { updatePopulation } from "../src/updatePopulation";
import { Colony } from "../src/Colony";

Pedometer.getStepCountAsync = jest.fn();
Pedometer.isAvailableAsync = jest.fn();

describe("Target class", () => {
  let testTarget;
  beforeEach(() => {
    testTarget = new Target();
  });
  test("Target should by 4500 by default", () => {
    expect(testTarget.target).toBe(4500);
  });
  test("5000 steps should pass default target", () => {
    expect(testTarget.isReached(5000, 5)).toEqual(true);
  });
  test("4999 steps should pass default target", () => {
    expect(testTarget.isReached(4999)).toEqual(false);
  });
  test("Target should be 400 when set", () => {
    testTarget = new Target(400);
    expect(testTarget.target).toBe(400);
  });
  test("New target should increase by 100 if old target is reached", async () => {
    Pedometer.isAvailableAsync.mockReturnValue(true);
    testColony = new Colony();
    today = new Date();
    today.setHours(0, 0, 0, 0);
    yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    Pedometer.getStepCountAsync.mockReturnValue({ steps: 5000 });
    await updatePopulation(testTarget, testColony, yesterday, today);
    expect(testColony.showPopulation()).toEqual(6);
    expect(testTarget.target).toEqual(5100);
  });
});
