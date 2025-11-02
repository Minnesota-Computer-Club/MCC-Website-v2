// The Layout Page Spec is a test used to check that the main pages across the site 
// follow the minimum layout: Header, Page Title, Footer, Copyright.

const pages = ['/', '/news', '/wcc', '/wcc/leaderboard', '/wcc/leaderboard/2022']

describe('Minimum Page Layout', () => {
  pages.forEach((page) => {
    context(page, () => {
      context("Header", () => {
        it('Has Navbar with Working Links', () => {
          cy.visit(page);
          cy.get('nav').should('be.visible');

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
          ];

          requiredNavBarLinks.forEach(link => {
            cy.get('nav').first().children().should('contain', link.name);

            if (link.dropdown) {
              link.submenu.forEach(dropdownLink => {
                cy.get('nav').first().children().get('div')
                  .get('[data-headlessui-state]').first().click()
                  .get('a').contains(dropdownLink.name).click();
                cy.location('pathname').should('eq', dropdownLink.path);
                cy.location('hash').should('eq', dropdownLink.hash || "");
              })
            } else {
              cy.get('nav').first().children().get('a').contains(link.name).click();
              cy.location('pathname').should('eq', link.path);
            }
          });
        });
      });

      context("Page Content", () => {
        it('Has h1 Tag with Site Title', () => {
          cy.visit(page);
          cy.get('h1').should('exist');
          cy.get('h1').should('be.visible');
        });
      });

      context("Footer", () => {
        it('Contains Copyright', () => {
          cy.visit(page);
          cy.get('footer').should('be.visible');
          cy.get('footer').contains('©');
          cy.get('footer').contains('p', `2022 -`);
          cy.get('footer').contains('All rights reserved.');
        })

        it('Contains Navbar w/ Correct Links', () => {
          cy.visit(page);
          cy.get('footer').get('nav').should('be.visible');
          cy.get('footer').get('nav').children()
            .should('contain', 'Home')
            .and('contain', 'News')
            .and('contain', 'Winter Coding Challenge')
            .and('contain', 'WCC Leaderboard');
        });
      });
    });
  });
});