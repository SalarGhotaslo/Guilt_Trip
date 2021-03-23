import { names } from "../src/names";
import { personalities } from "../src/personalities";
import { passions } from "../src/passions";


export class Sloth {
  constructor(name = this._randomAttribute(names), personality = this._randomPersonality(), passion = this._randomAttribute(passions)) {
    this.name = name;
    this.personality = personality;
    this.passion = passion;
  }

  // _randomName() {
  //   return names[Math.floor(Math.random() * names.length)]
  // }

  _randomPersonalityGroup () {
    return Math.floor(Math.random() * personalities.length)
  }

  _randomPersonality() {
    let personalityGroup = this._randomPersonalityGroup()
    return personalities[personalityGroup][Math.floor(Math.random() * personalities[personalityGroup].length)]
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
