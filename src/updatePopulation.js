export function updatePopulation(target, colony, steps) {
  if (target.isReached(steps)) {
    colony.addCreature();
  } else {
    colony.killCreature();
  }
}
