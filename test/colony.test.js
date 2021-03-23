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
    expect(colonyTest.sloths.length).toBe(6);
  });

  test("it should reduce population", () => {
    colonyTest.killCreature();
    expect(colonyTest.showPopulation()).toBe(4);
    expect(colonyTest.sloths.length).toBe(4);
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
  test("non default sloths can be passed as an argument and generated", () => {
    colonyTest = new Colony(1, [
      { "name": "Emie",
       "passion": "Writing music",
       "personality": "Unsentimental",
     },
   ]);
    expect(colonyTest.sloths.length).toEqual(1);
    expect(colonyTest.sloths[0].name).toEqual("Emie");
    expect(colonyTest.sloths[0].personality).toEqual("Unsentimental");
    expect(colonyTest.sloths[0].passion).toEqual("Writing music");
  });
  
  test("default colony is created when there is no data in SecureStore", () => {
    colony = new Colony(0, 0) 
    expect(colony.sloths instanceof Array).toBe(true)
    expect(colony.sloths.length).toEqual(DEFAULT_POPULATION)
    expect(colony.sloths[0] instanceof Sloth).toBe(true)
  })
});
