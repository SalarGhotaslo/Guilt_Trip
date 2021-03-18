import { performStepApi, DAY } from "./performStepApi";

export function updatePopulation(target, colony, lastLogin, today) {
  while (today.getTime() > lastLogin.getTime()) {
    let range = lastLogin;
    range.setDate(range.getDate() + 1);
    let steps = 5000; // await performStepApi(lastLogin, range);
    target.isReached(steps) ? colony.addCreature() : colony.killCreature();
    lastLogin = range;
  }
  return colony.showPopulation();
  // store last login
}
