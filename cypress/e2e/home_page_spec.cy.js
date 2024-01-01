describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Has Page Content', () => {
    cy.get('body').should('be.visible')
    cy.get('body').should(($body) => {
      expect($body.first()).to.contain('The Minnesota Computer Club is a Discord-based community of students and teachers from all across Minnesota.')
      expect($body.first()).to.contain('Connect with New People')
      expect($body.first()).to.contain('Learn New Skills')
      expect($body.first()).to.contain('Show Off Your Skills')
      expect($body.first()).to.contain('Contribute to Community Projects')
    })
  })
});