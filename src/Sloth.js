import { names } from "../src/names";
import { personalities } from "../src/personalities";
import { passions } from "../src/passions";


export class Sloth {
  constructor(name = this._randomAttribute(names), personality = this._randomPersonality(), passion = this._randomAttribute(passions), personalityGroup = this._randomPersonalityGroup()) {
    this.name = name;
    this.personality = personality;
    this.passion = passion;
    this.personalityGroup = personalityGroup;
  }

  // _randomName() {
  //   return names[Math.floor(Math.random() * names.length)]
  // }

  _randomPersonalityGroup () {
    return Math.floor(Math.random() * personalities.length)
  }

  _randomPersonality() {
    this.personalityGroup = this._randomPersonalityGroup()
    return personalities[this.personalityGroup][Math.floor(Math.random() * personalities[this.personalityGroup].length)]
  }

  // _randomPassion() {
  //   return passions[Math.floor(Math.random() * passions.length)]
  // }

  _randomAttribute(array) {
    // console.log(array)
    // console.log(array.length)
    return array[Math.floor(Math.random() * array.length)]
  }
}
