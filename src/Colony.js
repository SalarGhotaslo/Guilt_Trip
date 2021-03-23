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
    this.sloths.push(new Sloth());
  }

  killCreature() {
    this.population--;
    this.sloths.pop();
  }

  _generateSloths() {
    if(this.sloths === 0 ) {
      this.sloths = [];
      this.population = DEFAULT_POPULATION;
    }
    if(this.sloths.length === 0) {
      for(let i = 0; i<this.population; i++) {
        this.sloths.push(new Sloth())
      }
    } else {
      let newSloths = []
      for(let i = 0; i <this.population; i++) {
        let name = this.sloths[i].name, 
          personality = this.sloths[i].personality,
          passion = this.sloths[i].passion
        newSloths.push(new Sloth(name, personality, passion))
        console.log(`Hi! I'm ${name}, I'm a ${personality} sloth and I love ${passion}`)
      }
      this.sloths = newSloths;
    }
  }
}
