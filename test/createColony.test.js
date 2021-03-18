import { DEFAULT_POPULATION } from "../src/Colony";
import { createColony } from "../src/createColony";

describe("createColony function", () => {
  dateToday = new Date();
  test("if date is null, create new default colony", () => {
    expect(createColony(null, null).showPopulation()).toEqual(
      DEFAULT_POPULATION
    );
  });
  test("if date is greater than 7 days, create new population", () => {
    expect(createColony("2020-02-02", 5).showPopulation()).toEqual(
      DEFAULT_POPULATION
    );
  });
  test("if the date is todays date, population stays the same", () => {
    expect(
      createColony("2021-03-18", 10, "2021-03-18").showPopulation()
    ).toEqual(10);
  });
});
