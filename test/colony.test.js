const {Colony} = require('../src/colony');

describe('Colony', function() {
  
  let colonyTest;
  beforeEach(() => {
    colonyTest = new Colony();
  })
  
  test('it should have a population of 5', function(){
    expect(colonyTest.showPopulation()).toBe(5);
  })
})