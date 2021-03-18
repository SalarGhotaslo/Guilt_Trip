import { Colony } from "../src/Colony";
import { Target } from "../src/Target";
import { updatePopulation } from "../src/updatePopulation";

const SIX_DAYS = 6 * 24 * 60 * 60 * 1000;
export function createColony(date, population, dateToday = new Date()) {
  let lastLogin = new Date(date);
  let today = new Date(dateToday);
  let dateDifference = today.setHours(0, 0, 0, 0) - lastLogin;
  if (date === null) {
    console.log("Welcome to Guilt Trip");
    return new Colony();
  } else if (dateDifference > SIX_DAYS) {
    console.log("Your colony is dead you lazy bastard");
    return new Colony();
  } else if (dateDifference === 0) {
    console.log("Welcome back");
    return new Colony(population);
  } else {
    return updatePopulation(new Target(), new Colony(population), lastLogin, today);
  }
}
