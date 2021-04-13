describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Mauricio',
      username: 'Garmauco',
      password: 'top123456'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })
  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('user can login', () => {
    cy.contains('Show Login').click()
    cy.get('input[name="Username"]').type('Garmauco')
    cy.get('input[name="Password"]').type('top123456')
    cy.get('#form-button-login').click()
    cy.get('input[name="CreateNote"]')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show Login').click()
    cy.get('input[name="Username"]').type('Garmauco')
    cy.get('input[name="Password"]').type('passwrong')
    cy.get('#form-button-login').click()
    //cy.get('.error').contains('Wrong Credentials')
    cy.get('.error')
      .should('contain', 'Wrong Credentials')//should+'contain'=debería contener..'Wrong Credentials'
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })
  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'Garmauco', password: 'top123456' })//support/commands
    })
    it('a new note can be created', () => {
      const noteContent = 'New Note test from cypress'
      cy.contains('New Note').click()
      cy.get('input[name="CreateNote"]').type(noteContent)
      cy.contains('save').click()
      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'Firts note from Cypress', important: false })
        cy.createNote({ content: 'Second note created from Cypress', important: false })
        cy.createNote({ content: 'Third note created from Cypress', important: false })
      })
      it.only('it can be made important', () => {
        cy.contains('Second note created from Cypress').as('theNote')

        cy.get('@theNote')
          .contains('make important')
          .click()
        //cy.debug()
        cy.get('@theNote')
          .contains('make not important')
      })
    })
  })
})

