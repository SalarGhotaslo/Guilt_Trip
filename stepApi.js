import { Pedometer } from 'expo-sensors';

export function performStepAPI() {
  Pedometer.isAvailableAsync().then(function(isAvailable) {
    if (isAvailable) {
      let start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end = new Date;
      Pedometer.getStepCountAsync(start, end).then(function(response) {
        console.log(response.steps);
        return response.steps;
      });
    }
  });
}
