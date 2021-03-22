import { Sloth } from "./Sloth";

export const DEFAULT_POPULATION = 5;

export class Colony {
  constructor(population = DEFAULT_POPULATION, sloths = []) {
    this.population = population;
    this.sloths = sloths;
    this._generateSloths();
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

  _generateSloths() {
    if(this.sloths.length === 0) {
      for(let i = 0; i<DEFAULT_POPULATION; i++) {
        this.sloths.push(new Sloth())
      }
    } else {
      console.log(this.sloths)
    }
  }
}
