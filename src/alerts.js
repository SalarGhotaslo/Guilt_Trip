export function alertsFunction(
  lastLogin,
  today,
  yesterdayPopulation,
  todayPopulation
) {
  let lastLogin2 = new Date(lastLogin);
  let today2 = new Date(today);
  let dateDifference2 = today2.setHours(0, 0, 0, 0) - lastLogin2;
  dateDifference2 = secondsToDays(dateDifference2);
  if (dateDifference2 === 0) {
    return "Welcome to Guilt trip!";
  } else if (dateDifference2 > 6) {
    return "You are a lazy loser!";
  } else if (dateDifference2 === 1 && yesterdayPopulation < todayPopulation) {
    return "Well done, you hit your target yesterday!";
  } else if (dateDifference2 === 1 && yesterdayPopulation > todayPopulation) {
    return "You lazy loser, you killed a sloth";
  }
}

function secondsToDays(milliseconds) {
  return milliseconds / 24 / 60 / 60 / 1000;
}
