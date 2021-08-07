describe('filter Pokemons', () => {
	describe('when selecting pokemons and filtering', () => {
		it('should display the correct pokemons when filtering for not caught', () => {
			cy.visit('http://localhost:3000');
			cy.get('[data-t-pokeball="list-charizard"]').click();
			cy.get('[data-t-pokeball="list-charmander"]').click();
			cy.get('[data-t-pokeball="list-charmeleon"]').click();
			cy.get('#filters>[data-t-is-captured="false"]').click();

			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charizard\']').should('not.exist');
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charmander\']').should('not.exist');
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charmeleon\']').should('not.exist');
		});

		it('should display the correct pokemons when filtering for caught', () => {
			cy.visit('http://localhost:3000');
			cy.get('[data-t-pokeball="list-charizard"]').click();
			cy.get('[data-t-pokeball="list-charmander"]').click();
			cy.get('[data-t-pokeball="list-charmeleon"]').click();
			cy.get('#filters>[data-t-is-captured="true"]').click();

			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charizard\']').should('exist');
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charmander\']').should('exist');
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charmeleon\']').should('exist');
		});

		it('should remove the item when the result is filtered', () => {
			cy.visit('http://localhost:3000');
			cy.get('[data-t-pokeball="list-charizard"]').click();
			cy.get('[data-t-pokeball="list-charmander"]').click();
			cy.get('[data-t-pokeball="list-charmeleon"]').click();
			cy.get('#filters>[data-t-is-captured="true"]').click();
			cy.get('[data-t-pokeball="list-charmander"]').click();
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charizard\']').should('exist');
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charmander\']').should('not.exist');
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charmeleon\']').should('exist');
		});

		it('should display only selected pokemons when filtering by the search bar', () => {
			cy.visit('http://localhost:3000');
			
			cy.get('#search-bar>div>div>input').type('char');
			cy.wait(500);
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charizard\']').should('exist');
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charmander\']').should('exist');
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-charmeleon\']').should('exist');
			cy.get('#pokemon-list>div>div>div>[data-t-pokeball=\'list-bulbasaur\']').should('not.exist');
		});
	});
});