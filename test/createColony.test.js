import { DEFAULT_POPULATION } from "../src/Colony";
import { createColony } from "../src/createColony";
import { updatePopulation } from "../src/updatePopulation";
import { Pedometer } from 'expo-sensors'

const STEPS_MISSED = 5
const STEPS_HIT = 5000

Pedometer.getStepCountAsync = jest.fn()
Pedometer.isAvailableAsync = jest.fn()

describe("createColony function", () => {
  dateToday = new Date();
  test("if date is 0, create new default colony", () => {
    expect(createColony(0, 0, 0).showPopulation()).toEqual(
      DEFAULT_POPULATION
    );
  });
  test("if date is greater than 7 days, create new population", () => {
    expect(createColony("2020-03-10", 5).showPopulation()).toEqual(
      DEFAULT_POPULATION
    );
  });
  test("if the date is todays date, population stays the same", () => {
    expect(
      createColony("2021-03-18", 1, [
         { "name": "Emie",
          "passion": "Writing music",
          "personality": "Unsentimental",
        },
      ],"2021-03-18").showPopulation()
    ).toEqual(1);
  });
  // test("if last Login is not today and less than 6 days ago", () => {
  //   updatePopulation = jest.fn()
  //   updatePopulation.mockReturnValue(true)
  //   expect(createColony("2021-03-17", 1, [
  //   { "name": "Emie",
  //    "passion": "Writing music",
  //    "personality": "Unsentimental",
  //  },
  //   ],"2021-03-18")).toEqual(true)
  // });
});
