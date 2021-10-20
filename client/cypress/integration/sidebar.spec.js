describe('', () => {
  it('', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.get('input').focus().type('vienna')

    cy.get('p').should('contain', 'VIE').then((p)=>{
      return p.click()
    })


    
  })
})