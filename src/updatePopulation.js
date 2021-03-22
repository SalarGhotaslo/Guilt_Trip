import { Colony } from "./Colony";
import { performStepApi } from "./performStepApi";

export async function updatePopulation(target, colony, lastLogin, today) {
  while (today.getTime() > lastLogin.getTime()) {
    console.log(`lastLogin: ${lastLogin}`);
    let range = String(lastLogin);
    range = new Date(range);
    range.setDate(range.getDate() + 1);
    console.log(`range: ${range}`);
    let steps = await performStepApi(lastLogin, range);
    console.log(`steps: ${steps}`);
    target.isReached(steps) ? colony.addCreature() : colony.killCreature();
    lastLogin = range;
  }
  if (colony.showPopulation() === 0) {
    console.log("your population died you negligent lazy bastard");
    return new Colony();
  } else {
    console.log(
      `Welcome back! Your population is now ${colony.showPopulation()}`
    );
    return colony;
  }
}
