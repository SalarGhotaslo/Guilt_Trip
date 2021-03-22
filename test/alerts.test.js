import { alertsFunction } from "../src/alerts";

describe("alerts function", () => {
  test("if date last logged in is the same as today", () => {
    expect(alertsFunction("2021-03-18", "2021-03-18")).toEqual(
      "Welcome to Guilt trip!"
    );
  });
  test("if date last logged is over 6 days", () => {
    expect(alertsFunction("2021-03-17", "2021-03-18")).toEqual(
      "You are a lazy loser!"
    );
  });
});
