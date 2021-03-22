const { Colony, DEFAULT_POPULATION } = require("../src/Colony");
import { Sloth } from "../src/Sloth";

describe("Colony", function () {
  let colonyTest;
  beforeEach(() => {
    colonyTest = new Colony();
  });

  test("it should have a population of 5", function () {
    expect(colonyTest.showPopulation()).toBe(5);
  });

  test("it should add to population", function () {
    colonyTest.addCreature();
    expect(colonyTest.showPopulation()).toBe(6);
  });

  test("it should reduce population", () => {
    colonyTest.killCreature();
    expect(colonyTest.showPopulation()).toBe(4);
  });

  test("population can be changed if instantiated with different argument", () => {
    colonyTest = new Colony(7);
    expect(colonyTest.showPopulation()).toBe(7);
  });

  test("new colony generates DEFAULT_POPULATION number of random sloths", () => {
    colony = new Colony();
    expect(colony.sloths instanceof Array).toBe(true)
    expect(colony.sloths.length).toEqual(DEFAULT_POPULATION)
    expect(colony.sloths[0] instanceof Sloth).toBe(true)
    console.log(colony.sloths)
  })
});
