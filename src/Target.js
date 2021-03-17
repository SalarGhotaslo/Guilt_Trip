const DEFAULT_TARGET = 5000;

class Target {
  constructor(target = DEFAULT_TARGET) {
    this.target = target;
  }

  showTarget() {
    return this.target;
  }

  isReached(steps) {
    return steps >= this.target;
  }
}

module.exports = Target;
