const {Colony} = require('../src/colony');

describe('Colony', function() {

  let colonyTest;
  beforeEach(() => {
    colonyTest = new Colony();
  })
  
  test('it should have a population of 5', function(){
    expect(colonyTest.showPopulation()).toBe(5);
  })

  test('it should add to population', function(){
    colonyTest.addCreature();
    expect(colonyTest.showPopulation()).toBe(6);
  })
})