export function AppLogic(target, colony, steps) {
  if (target.isReached(steps)) {
    colony.addCreature();
  } else {
    colony.killCreature();
  }
}
