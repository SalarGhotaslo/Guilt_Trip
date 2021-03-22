import { alertsFunction } from "../src/alerts";

describe("alerts function", () => {
  test("if date last logged in is the same as today", () => {
    expect(alertsFunction("2021-03-18", "2021-03-18")).toEqual(
      "Welcome back to Guilt trip!"
    );
  });
  test("if date last logged is over 6 days", () => {
    expect(alertsFunction("2021-03-11", "2021-03-18")).toEqual(
      "GAME OVER. You are a lazy loser!"
    );
  });
  test("if population has gone up, user gets positive message", () => {
    expect(alertsFunction("2021-03-11", "2021-03-12", 4, 5)).toEqual(
      "Well done, you hit your target yesterday!"
    );
  });
  test("if population has gone down, user gets negative message", () => {
    expect(alertsFunction("2021-03-11", "2021-03-12", 6, 5)).toEqual(
      "You lazy loser, you killed a sloth"
    );
  });
  test("if population has gone up over two days, user gets positive message", () => {
    let previousPopulation = 5;
    let todayPopulation = 7;
    expect(
      alertsFunction(
        "2021-03-11",
        "2021-03-13",
        previousPopulation,
        todayPopulation
      )
    ).toEqual(
      `Well done, you've gained ${todayPopulation - previousPopulation} sloths!`
    );
  });
  test("if population has gone up over four days, user gets positive message", () => {
    let previousPopulation = 5;
    let todayPopulation = 7;
    expect(
      alertsFunction(
        "2021-03-11",
        "2021-03-15",
        previousPopulation,
        todayPopulation
      )
    ).toEqual(
      `Well done, you've gained ${todayPopulation - previousPopulation} sloths!`
    );
  });
  test("if population has gone down over two days, user gets negative message", () => {
    let previousPopulation = 5;
    let todayPopulation = 3;
    expect(
      alertsFunction(
        "2021-03-11",
        "2021-03-13",
        previousPopulation,
        todayPopulation
      )
    ).toEqual(
      `You lazy loser, you killed ${
        previousPopulation - todayPopulation
      } adorable sloth's`
    );
  });
  test("if user is playing for first time, it get's welcome message", () => {
    let previousPopulation = "";
    let todayPopulation = 5;
    expect(
      alertsFunction("", "2021-03-13", previousPopulation, todayPopulation)
    ).toEqual(
      "Welcome to Guilt Trip. Walk to save you Sloths live and build the snuggle"
    );
  });
});
