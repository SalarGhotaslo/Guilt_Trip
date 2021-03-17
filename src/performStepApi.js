import { Pedometer } from "expo-sensors";

const DAY = 24 * 60 * 60 * 1000;

let startTime = new Date();
startTime.setHours(0, 0, 0, 0);
let endTime = new Date();

export async function performStepApi(start = startTime, end = endTime) {
  let checkPedometer = Pedometer.isAvailableAsync();
  var isAvailable = await checkPedometer;
  if (isAvailable) {
    let stepData = Pedometer.getStepCountAsync(start, end);
    var result = await stepData;
    return result.steps;
  } else {
    console.log("Error");
  }
}
