import { Colony } from "./Colony";
import { performStepApi } from "./performStepApi";

export async function updatePopulation(target, colony, lastLogin, today) {
  while (today.getTime() > lastLogin.getTime()) {
    console.log(`lastLogin: ${lastLogin}`)
    let range = JSON.stringify(lastLogin);
    console.log(`range: ${range}`)
    range = JSON.parse(range)
    range.setDate(range.getDate() + 1);
    let steps = await performStepApi(lastLogin, range);
    console.log(`steps: ${steps}`)
    target.isReached(steps) ? colony.addCreature() : colony.killCreature();
    lastLogin = range;
  }
  if(colony.showPopulation() === 0 ){
    console.log("your population died you negligent lazy bastard")
    return new Colony();
  } else {
    console.log(`Welcome back! Your population is now ${colony.showPopulation()}`)
    return colony;
  }
}
