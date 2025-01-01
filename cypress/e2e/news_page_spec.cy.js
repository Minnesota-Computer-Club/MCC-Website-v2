describe('New Page', () => {
  beforeEach(() => {
    cy.visit('/news')

  });

  it('Has Visible Page Content', () => {
    cy.get('body').should('be.visible')
  });

  it('Has At Least 1 Article', () => {
    cy.get('article').should('have.length.greaterThan', 0);
  });

  it('Has Articles w/ Content', () => {
    cy.get('article').each(($article) => {
      cy.get($article).should('be.visible');
      cy.get($article).find('time').should('be.visible');
      cy.get($article).find('h3').should('be.visible');
      cy.get($article).find('div > p').last().should('be.visible');
    });
  });
});