import { Pedometer } from 'expo-sensors';

const DAY = 24 * 60 * 60 * 1000

async function performStepAPI() {
  let start = new Date; start.setHours(0, 0, 0, 0);
  let end = new Date, stepData = Pedometer.getStepCountAsync(start, end), checkPedometer = Pedometer.isAvailableAsync();
  var isAvailable = await checkPedometer;
  if (isAvailable) {
    var result = await stepData;
    return result.steps}
  else {console.log('Error');}
}

exports.performStepAPI = performStepAPI;

// let start = new Date(end - DAY)
