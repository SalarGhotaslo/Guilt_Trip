export const DEFAULT_TARGET = 4500;

export class Target {
  constructor(target = DEFAULT_TARGET) {
    this.target = target;
  }

  isReached(steps, population) {
    return steps >= this.target + population * 100;
  }

  updateTarget() {
    this.target += population * 100;
  }
}
