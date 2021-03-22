import { names } from "../src/names";
import { personalities } from "../src/personalities";


export class Sloth {
  constructor(name = this._randomName(), personality = this._randomPersonality(), passion) {
    this.name = name;
    this.personality = personality;
    this.passion = passion;
  }

  _randomName() {
    return names[Math.floor(Math.random() * names.length)]
  }

  _randomPersonalityGroup () {
    return Math.floor(Math.random() * 2)
  }

  _randomPersonality() {

    let personalityGroup = this._randomPersonalityGroup()
    return personalities[personalityGroup][Math.floor(Math.random() * personalities[personalityGroup].length)]
  }
}
