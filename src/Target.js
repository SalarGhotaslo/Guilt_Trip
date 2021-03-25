export const DEFAULT_TARGET = 4500;
export const DEFAULT_MULTIPLIER = 100;

export class Target {
  constructor(target = DEFAULT_TARGET, multiplier = DEFAULT_MULTIPLIER) {
    this.target = target;
    this.multiplier = DEFAULT_MULTIPLIER;
  }

  isReached(steps, population) {
    return steps >= DEFAULT_TARGET + (population * DEFAULT_MULTIPLIER);
  }

  dynamicTarget(population) {
    return DEFAULT_TARGET + (population * this.multiplier);
  }
}
