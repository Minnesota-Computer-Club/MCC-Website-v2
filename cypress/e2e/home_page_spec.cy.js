describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Has Navbar with Working Links', () => {
    const requiredNavBarLinks = [
      {
        "name": "Home",
        "path": "/"
      },
      {
        "name": "News",
        "path": "/news"
      },
      {
        "name": "Winter Coding Challenge",
        "dropdown": true, 
        "submenu": [
          {
            "name": "Information",
            "path": "/wcc"
          },
          {
            "name": "Leaderboard",
            "path": "/wcc/leaderboard"
          },
          {
            "name": "Register",
            "path": "/wcc",
            "hash": "#register"
          },
          {
            "name": "Sponsors",
            "path": "/wcc",
            "hash": "#sponsors"
          },
        ]
      }
    ]

    requiredNavBarLinks.forEach(link => {
      cy.get('nav').first().children().should('contain', link.name)

      if (link.dropdown) {
       link.submenu.forEach(dropdownLink => {
          cy.get('nav').first().children().get('div')
            .get('[data-headlessui-state]').first().click()
            .get('a').contains(dropdownLink.name).click()
          cy.location('pathname').should('eq', dropdownLink.path)
          cy.location('hash').should('eq', dropdownLink.hash || "")
          cy.visit('/')
        })
      } else {
        cy.get('nav').first().children().get('a').contains(link.name).click()
        cy.location('pathname').should('eq', link.path)
        cy.visit('/')
      }
    })
  })

  it('Has h1 Tag with Site Title', () => {
    cy.get('h1').contains('Minnesota Computer Club')
  })

  it('Has Footer with Copyright', () => {
    cy.get('footer').contains('©')
    cy.get('footer').contains('p', `2022 -`)
    cy.get('footer').contains('All rights reserved.')
  })

  it('Has Footer with Navbar', () => {
    cy.get('footer').get('nav').children()
    .should('contain', 'Home')
    .and('contain', 'News')
    .and('contain', 'Winter Coding Challenge')
    .and('contain', 'WCC Leaderboard')
  })
});