import { performStepApi, DAY } from "./performStepApi";

export async function updatePopulation(target, colony, lastLogin, today) {
  while (today.getTime() > lastLogin.getTime()) {
    let range = lastLogin;
    range.setDate(range.getDate() + 1);
    let steps = await performStepApi(lastLogin, range);
    console.log(steps)
    target.isReached(steps) ? colony.addCreature() : colony.killCreature();
    lastLogin = range;
  }
  return colony.showPopulation();
  // store last login
}
