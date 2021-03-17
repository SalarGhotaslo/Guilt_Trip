describe('Step count page', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it("should have some step-related text", () => {
    cy.contains('Steps taken today')
  })

})

describe ('First Test', () => {
  it ('is working', () => {
    expect (true).to.equal (true);
  });
});
