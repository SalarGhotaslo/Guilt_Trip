export function alertsFunction(lastLogin, today) {
  let lastLogin2 = new Date(lastLogin);
  console.log(lastLogin2);
  let today2 = new Date(today);
  console.log(today2);
  let dateDifference2 = today2.setHours(0, 0, 0, 0) - lastLogin2;
  console.log(dateDifference2);
  if (dateDifference2 === 0) {
    return "Welcome to Guilt trip!";
  } else if (dateDifference2 > 6) {
    return "You are a lazy loser!";
  }
}

//int comparison = date1.compareTo(date2);

// console.log(`lastLogin: ${this.state.lastLogin}`);
//           let today = new Date();
//           let todayForStorage = JSON.stringify(today);
//           todayForStorage = todayForStorage.substring(1, 11);
//           console.log(todayForStorage);
//           if (this.state.lastLogin == todayForStorage) {
//             Alert.alert("Welcome to Guilt trip!");
//           } else if (this.state.population() === 3) {
//             Alert.alert("You lose!!");
//           }
