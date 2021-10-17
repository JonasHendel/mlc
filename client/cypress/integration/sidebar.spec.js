describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.contains('Min. distance').click()

    cy.get('input').focus().type('vienna')

    cy.get('p').should('contain', 'VIE').then((p)=>{
      return p.click()
    })


    
  })
})