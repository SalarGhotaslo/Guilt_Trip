import { positiveTalk } from "../src/positiveTalk";
import { negativeTalk } from "../src/negativeTalk";
import { neutralTalk } from "../src/neutralTalk";
import { slothSpeech, setXPosition, RIGHT_SIDE, LEFT_SIDE, windowWidth, windowHeight } from "../src/slothSpeech";

   test('It chooses a positive comment for a positive sloth', () =>{
     let speech = slothSpeech({
       name: "Louie",
       passion: "Astronomy",
       personality: "Shy",
       personalityGroup: 0,
     })
     expect(positiveTalk.includes(speech)).toEqual(true)
   })

   test('It chooses a neutral comment for a neutral sloth', () =>{
     let speech = slothSpeech({
          personalityGroup: 1,
          name: 'Karlis',
          personality: 'Hardworking',
          passion: 'Do it yourself'
        })
     expect(neutralTalk.includes(speech)).toEqual(true)
   })

   test('It chooses a negative comment for a negative sloth', () =>{
     let speech = slothSpeech({
       personalityGroup: 2,
       name: 'Mulaykah',
       personality: 'Understanding',
       passion: 'Dance'
        })
     expect(negativeTalk.includes(speech)).toEqual(true)
   })

   test('It can calculate the correct right hand side position', () => {
     expect(setXPosition(1)).toEqual(RIGHT_SIDE)
   })

   test('It can calculate the correct right hand side position', () => {
     expect(setXPosition(0)).toEqual(LEFT_SIDE)
   })
