export const DEFAULT_POPULATION = 5;

export class Colony {
  constructor(population = DEFAULT_POPULATION) {
    this.population = population;
  }

  showPopulation() {
    return this.population;
  }

  addCreature() {
    this.population++;
  }

  killCreature() {
    this.population--;
  }
}
