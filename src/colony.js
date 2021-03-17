const DEFAULT_POPULATION = 5

class Colony {

  constructor(population = DEFAULT_POPULATION) {
    this.population = population;
  }

  showPopulation() {
    return this.population;
  }

  addCreature() {
    this.population += 1
  }
}

module.exports = {
  Colony,
};