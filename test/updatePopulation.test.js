import { updatePopulation } from "../src/updatePopulation";
import { Target } from "../src/Target";
import { Colony } from "../src/Colony";
import { Pedometer } from "expo-sensors";
import { performStepApi } from "../src/performStepApi";

Pedometer.getStepCountAsync = jest.fn();
Pedometer.isAvailableAsync = jest.fn();

beforeEach(() => {
  Pedometer.isAvailableAsync.mockReturnValue(true);
});


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
    Pedometer.getStepCountAsync.mockReturnValue({"steps":50000})
    await updatePopulation(testTarget, testColony, yesterday, today)
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(6);
  });

  test("it decreases by 1 when target is missed on previous day", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    Pedometer.getStepCountAsync.mockReturnValue({"steps":5})
    await updatePopulation(testTarget, testColony, yesterday, today)
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
    Pedometer.getStepCountAsync.mockReturnValue({"steps":50000})
    await updatePopulation(testTarget, testColony, threeDaysAgo, today);
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
    Pedometer.getStepCountAsync.mockReturnValue({"steps":5})
    await updatePopulation(testTarget, testColony, threeDaysAgo, today);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(2);
  });

  test("it decreases by 2 and increases by 1 if the target is: missed, missed, hit", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let threeDaysAgo = new Date();
    threeDaysAgo.setHours(0, 0, 0, 0);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    console.log(threeDaysAgo)
    Pedometer.getStepCountAsync.mockReturnValueOnce({"steps":5}).mockReturnValueOnce({"steps":5}).mockReturnValue({"steps":5000});
    await updatePopulation(testTarget, testColony, threeDaysAgo, today);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(4);
  });

  test("it increases by 2 and decreases by 1 if the target is: hit, hit, missed", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let threeDaysAgo = new Date();
    threeDaysAgo.setHours(0, 0, 0, 0);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    console.log(threeDaysAgo)
    Pedometer.getStepCountAsync.mockReturnValueOnce({"steps":5000}).mockReturnValueOnce({"steps":5000}).mockReturnValue({"steps":5});
    await updatePopulation(testTarget, testColony, threeDaysAgo, today);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(6);
  });

  test("it increases by 3 and decreases by 1 if the target is: hit, missed, hit, hit", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let fourDaysAgo = new Date();
    fourDaysAgo.setHours(0, 0, 0, 0);
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    console.log(fourDaysAgo)
    Pedometer.getStepCountAsync.mockReturnValueOnce({"steps":5000}).mockReturnValueOnce({"steps":5}).mockReturnValue({"steps":7000}).mockReturnValue({"steps":6000});
    await updatePopulation(testTarget, testColony, fourDaysAgo, today);
    expect(testColony.showPopulation()).not.toBe(5);
    expect(testColony.showPopulation()).toBe(7);
  });

  test("it resets the colony to 5 if game is over (5 consecutive missed dauys)", async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let fiveDaysAgo = new Date();
    fiveDaysAgo.setHours(0, 0, 0, 0);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    Pedometer.getStepCountAsync.mockReturnValue({"steps":5})
    await updatePopulation(testTarget, testColony, fiveDaysAgo, today);
    expect(testColony.showPopulation()).toBe(0);
    expect(Colony).toHaveBeenCalled
  });


});
