export const DEFAULT_TARGET = 4500;

export class Target {
  constructor(target = DEFAULT_TARGET) {
    this.target = target;
  }

  showTarget() {
    return this.target;
  }

  isReached(steps, population) {
    return steps >= this.target + (population * 100);
  }
}
