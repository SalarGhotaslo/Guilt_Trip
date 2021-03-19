import { updatePopulation } from "../src/updatePopulation";
import { Target } from "../src/Target";
import { Colony } from "../src/Colony";
import { Pedometer } from "expo-sensors";
import { performStepApi } from "../src/performStepApi";

Pedometer.getStepCountAsync = jest.fn();
Pedometer.isAvailableAsync = jest.fn();


describe("updatePopulation function", () => {
  let testTarget, testColony, testSteps;
  beforeEach(() => {
    testTarget = new Target();
    testColony = new Colony();
  });

  test("it increases by 1 when target is met on previous day", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    Pedometer.isAvailableAsync.mockReturnValue(true)
    Pedometer.getStepCountAsync.mockReturnValue({"steps":50000})
    await updatePopulation(testTarget, testColony, yesterday, today)
    console.log(testColony.showPopulation())
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(6);
  });

  test("it decreases by 1 when target is missed on previous day", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    Pedometer.isAvailableAsync.mockReturnValue(true)
    Pedometer.getStepCountAsync.mockReturnValue({"steps":5})
    await updatePopulation(testTarget, testColony, yesterday, today)
    console.log(testColony.showPopulation())
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(4);
  });

  test("it increases by 3 when target is met 3 days in a row", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let threeDaysAgo = new Date();
    threeDaysAgo.setHours(0, 0, 0, 0);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    console.log(threeDaysAgo)
    Pedometer.isAvailableAsync.mockReturnValue(true)
    Pedometer.getStepCountAsync.mockReturnValue({"steps":50000})
    await updatePopulation(testTarget, testColony, threeDaysAgo, today);
    console.log("Population is now")
    console.log(testColony.showPopulation())
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(8);
  });

  test("it decreases by 3 when target is missed 3 days in a row", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let threeDaysAgo = new Date();
    threeDaysAgo.setHours(0, 0, 0, 0);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    console.log(threeDaysAgo)
    Pedometer.isAvailableAsync.mockReturnValue(true)
    Pedometer.getStepCountAsync.mockReturnValue({"steps":5})
    await updatePopulation(testTarget, testColony, threeDaysAgo, today);
    console.log("Population is now")
    console.log(testColony.showPopulation())
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(2);
  });

});
