import { performStepApi } from "./performStepApi";

export function alertsFunction(
  lastLogin,
  today,
  previousPopulation,
  todayPopulation
) {
  let lastLogin2 = new Date(lastLogin);
  let today2 = new Date(today);
  let dateDifference2 = today2.setHours(0, 0, 0, 0) - lastLogin2;
  dateDifference2 = secondsToDays(dateDifference2);
  if (dateDifference2 === 0) {
    return "Welcome back to Guilt trip!";
  } else if (dateDifference2 > 6) {
    return "GAME OVER. You are a lazy loser!";
  } else if (dateDifference2 === 1 && previousPopulation < todayPopulation) {
    return "Well done, you hit your target yesterday!";
  } else if (dateDifference2 === 1 && previousPopulation > todayPopulation) {
    return "You lazy loser, you killed a sloth";
  } else if (dateDifference2 > 1 && previousPopulation < todayPopulation) {
    return `Well done, you've gained ${
      todayPopulation - previousPopulation
    } sloths!`;
  } else if (dateDifference2 > 1 && previousPopulation > todayPopulation) {
    return `You lazy loser, you killed ${
      previousPopulation - todayPopulation
    } adorable sloth's`;
  } else if (dateDifference2 === "" || previousPopulation === "") {
    return "Welcome to Guilt Trip. Walk to save you Sloths live and build the snuggle";
  }
}

function secondsToDays(milliseconds) {
  return milliseconds / 24 / 60 / 60 / 1000;
}
