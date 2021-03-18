import { Colony } from "../src/colony";
export function createColony(date, population, dateToday = new Date()) {
  let dateDifference = dateToday - date;
  if (date === null) {
    console.log("Welcome to Guilt Trip");
    return new Colony();
  } else if (dateDifference > 6) {
    console.log("Your colony is dead you lazy bastard");
    return new Colony();
  } else if (date === dateToday) {
    console.log("Welcome back");
    return new Colony(population);
  }
}
