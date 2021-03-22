import { alertsFunction } from "../src/alerts";
import { Alert } from "react-native";

jest.spyOn(Alert, "alert");

describe("alerts function", () => {
  test("if date last logged in is the same as today", () => {
    alertsFunction("2021-03-18", "2021-03-18");
    expect(Alert.alert).toHaveBeenCalledWith(
      "Welcome back!",
      "Check your steps - have you hit today's target yet?"
    );
  });
  test("if date last logged is over 6 days", () => {
    alertsFunction("2021-03-11", "2021-03-18");
    expect(Alert.alert).toHaveBeenCalledWith(
      "GAME OVER!",
      "You are a lazy loser!"
    );
  });
  test("if population has gone up, user gets positive message", () => {
    alertsFunction("2021-03-11", "2021-03-12", 4, 5);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Good job!",
      "You hit your target yesterday!, come meet your new sloth"
    );
  });
  test("if population has gone down, user gets negative message", () => {
    alertsFunction("2021-03-11", "2021-03-12", 6, 5);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Oh dear!",
      "You lazy loser, you killed a sloth"
    );
  });
  test("if population has gone up over two days, user gets positive message", () => {
    let previousPopulation = 5;
    let todayPopulation = 7;
    alertsFunction(
      "2021-03-11",
      "2021-03-13",
      previousPopulation,
      todayPopulation
    );
    expect(Alert.alert).toHaveBeenCalledWith(
      "Good job!",
      `You've gained ${todayPopulation - previousPopulation} sloths!`
    );
  });
  test("if population has gone up over four days, user gets positive message", () => {
    let previousPopulation = 5;
    let todayPopulation = 7;
    alertsFunction(
      "2021-03-11",
      "2021-03-15",
      previousPopulation,
      todayPopulation
    );
    expect(Alert.alert).toHaveBeenCalledWith(
      "Good job!",
      `You've gained ${todayPopulation - previousPopulation} sloths!`
    );
  });
  test("if population has gone down over two days, user gets negative message", () => {
    let previousPopulation = 5;
    let todayPopulation = 3;
    alertsFunction(
      "2021-03-11",
      "2021-03-13",
      previousPopulation,
      todayPopulation
    );
    expect(Alert.alert).toHaveBeenCalledWith(
      "Shame on you!",
      `You lazy loser. You killed ${
        previousPopulation - todayPopulation
      } adorable sloth's`
    );
  });
  test("if user is playing for first time, it get's welcome message", () => {
    let previousPopulation = "";
    let todayPopulation = 5;
    alertsFunction("", "2021-03-13", previousPopulation, todayPopulation);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Welcome to Guilt trip!",
      "Walk to grow your Sloth family"
    );
  });
});
