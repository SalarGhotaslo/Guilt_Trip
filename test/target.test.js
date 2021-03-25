import { Target } from "../src/Target";
import { Pedometer } from "expo-sensors";
import { updatePopulation } from "../src/updatePopulation";
import { Colony } from "../src/Colony";

Pedometer.getStepCountAsync = jest.fn();
Pedometer.isAvailableAsync = jest.fn();
const STEPS_HIT = 10000
const STEPS_MISSED = 4000

describe("Target class", () => {
  let testTarget, testColony, today, yesterday, threeDaysAgo, fourDaysAgo ,fiveDaysAgo;

  beforeEach(() => {
    Pedometer.isAvailableAsync.mockReturnValue(true)
    testTarget = new Target()
    testColony = new Colony()
    today = new Date()
    today.setHours(0, 0, 0, 0)
    yesterday = new Date()
    yesterday.setHours(0, 0, 0, 0)
    yesterday.setDate(yesterday.getDate() - 1)
    threeDaysAgo = new Date()
    threeDaysAgo.setHours(0, 0, 0, 0)
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    fourDaysAgo = new Date()
    fourDaysAgo.setHours(0, 0, 0, 0)
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4)
    console.log(fourDaysAgo)
    fiveDaysAgo = new Date()
    fiveDaysAgo.setHours(0, 0, 0, 0)
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
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

  test("Dynamic target should increase by 100 if old target is reached", async () => {
    Pedometer.getStepCountAsync.mockReturnValue({ steps: STEPS_HIT });
    await updatePopulation(testTarget, testColony, yesterday, today);
    expect(testColony.showPopulation()).toEqual(6);
    expect(testTarget.dynamicTarget(testColony.showPopulation())).toEqual(5100);
  });

  test("Dynamic Target should be 5500 if player hits goal five days in a row from new game", async() =>{
     Pedometer.getStepCountAsync.mockReturnValue({ steps: STEPS_HIT });
     await updatePopulation(testTarget, testColony, fiveDaysAgo, today);
     expect(testColony.showPopulation()).toEqual(10)
     expect(testTarget.dynamicTarget(testColony.showPopulation())).toEqual(5500);
  })

  test("Dynamic Target should be 4700 if player misses goal three days in a row from new game", async() =>{
     Pedometer.getStepCountAsync.mockReturnValue({ steps: STEPS_MISSED });
     await updatePopulation(testTarget, testColony, threeDaysAgo, today);
     expect(testColony.showPopulation()).toEqual(2)
     expect(testTarget.dynamicTarget(testColony.showPopulation())).toEqual(4700);
  })

  test("Dynamic Target should be 5200 if player: hits, misses, hits goal", async() =>{
    Pedometer.getStepCountAsync
      .mockReturnValueOnce({"steps":STEPS_HIT})
      .mockReturnValueOnce({"steps":STEPS_MISSED})
      .mockReturnValue({"steps":STEPS_HIT})
      .mockReturnValue({"steps":STEPS_HIT});
     await updatePopulation(testTarget, testColony, fourDaysAgo, today);
     expect(testColony.showPopulation()).toEqual(7)
     expect(testTarget.dynamicTarget(testColony.showPopulation())).toEqual(5200);
  })

  test("Dynamic Target should be 4800 if player: misses, misses, hits, misses goal", async() =>{
    Pedometer.getStepCountAsync
      .mockReturnValueOnce({"steps":STEPS_MISSED})
      .mockReturnValueOnce({"steps":STEPS_MISSED})
      .mockReturnValueOnce({"steps":STEPS_HIT})
      .mockReturnValueOnce({"steps":STEPS_MISSED});
     await updatePopulation(testTarget, testColony, fourDaysAgo, today);
     expect(testColony.showPopulation()).toEqual(3)
     expect(testTarget.dynamicTarget(testColony.showPopulation())).toEqual(4800);
  })

  test("Dynamic Target should be 4800 if player: misses, misses, hits, misses goal (magic number)", async() =>{
    Pedometer.getStepCountAsync
      .mockReturnValueOnce({"steps":STEPS_MISSED})
      .mockReturnValueOnce({"steps":STEPS_MISSED})
      .mockReturnValueOnce({"steps":4801})
      .mockReturnValueOnce({"steps":STEPS_MISSED});
     await updatePopulation(testTarget, testColony, fourDaysAgo, today);
     expect(testColony.showPopulation()).toEqual(3)
     expect(testTarget.dynamicTarget(testColony.showPopulation())).toEqual(4800);
  })

  test("Dynamic Target should be 5200 if player: hit, misses, hits, hits goal (magic numbers)", async() =>{
    Pedometer.getStepCountAsync
      .mockReturnValueOnce({"steps":5001})
      .mockReturnValueOnce({"steps":5099})
      .mockReturnValueOnce({"steps":5001})
      .mockReturnValueOnce({"steps":5101});
     await updatePopulation(testTarget, testColony, fourDaysAgo, today);
     expect(testColony.showPopulation()).toEqual(7)
     expect(testTarget.dynamicTarget(testColony.showPopulation())).toEqual(5200);
  })

  test("Dynamic Target should be 5400 if player: hits four days in a row (magic numbers)", async() =>{
    Pedometer.getStepCountAsync
      .mockReturnValueOnce({"steps":5001})
      .mockReturnValueOnce({"steps":5101})
      .mockReturnValueOnce({"steps":5201})
      .mockReturnValueOnce({"steps":5301});
     await updatePopulation(testTarget, testColony, fourDaysAgo, today);
     expect(testColony.showPopulation()).toEqual(9)
     expect(testTarget.dynamicTarget(testColony.showPopulation())).toEqual(5400);
  })


});
