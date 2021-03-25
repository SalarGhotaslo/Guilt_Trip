import { Alert } from "react-native";

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
  if(lastLogin === "0") {
    Alert.alert("Welcome to Sloth!", "Walk to grow your Sloth family");
  } else if (dateDifference2 === 0) {
    Alert.alert(
      "Welcome back!",
      "Check your steps - have you hit today's target yet?"
    );
  } else if (dateDifference2 > 6) {
    Alert.alert("GAME OVER!", "You are a lazy loser!");
  } else if (dateDifference2 === 1 && previousPopulation < todayPopulation) {
    Alert.alert(
      "Good job!",
      "You hit your target yesterday!, come meet your new sloth"
    );
  } else if (dateDifference2 === 1 && previousPopulation > todayPopulation) {
    Alert.alert("Oh dear!", "You lazy loser, you killed a sloth");
  } else if (dateDifference2 > 1 && previousPopulation < todayPopulation) {
    Alert.alert(
      "Good job!",
      `You've gained ${todayPopulation - previousPopulation} sloths!`
    );
  } else if (dateDifference2 > 1 && previousPopulation > todayPopulation) {
    Alert.alert(
      "Shame on you!",
      `You lazy loser. You killed ${
        previousPopulation - todayPopulation
      } adorable sloth's`
    );
  } 
}

function secondsToDays(milliseconds) {
  return milliseconds / 24 / 60 / 60 / 1000;
}
