import { names } from "../src/names";

export class Sloth {
  constructor(name = this._randomName(), personality, passion) {
    this.name = name;
    this.personality = personality;
    this.passion = passion;
  }

  _randomName() {
    return names[Math.floor(Math.random() * names.length)]
  }
}
