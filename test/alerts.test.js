import { alertsFunction } from "../src/alerts";

describe("alerts function", () => {
  test("if date last logged in is the same as today", () => {
    expect(alertsFunction("2021-03-18", "2021-03-18")).toEqual(
      "Welcome to Guilt trip!"
    );
  });
  test("if date last logged is over 6 days", () => {
    expect(alertsFunction("2021-03-11", "2021-03-18")).toEqual(
      "You are a lazy loser!"
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
});
