
describe('capture Pokemons', () => {
	describe('when setting a pokemon as being caught', () => {
		it('should add it to the caught pokemon if uncaught', () => {
			cy.visit('http://localhost:3000');
			cy.get('[data-t-pokeball="list-charizard"]').click();
			cy.get('[data-t-list-item="charizard"]').click();
			cy.get('[data-t-pokeball="description-charizard"]').should('have.attr', 'data-t-is-captured', 'true');
		});
		it('should remove it if already caught', () => {
			cy.visit('http://localhost:3000');
			cy.get('[data-t-list-item="charizard"]').click();
			cy.get('[data-t-pokeball="description-charizard"]').click();
			cy.get('[data-t-pokeball="description-charizard"]').click();
			cy.get('[data-t-pokeball="list-charizard"]').should('have.attr', 'data-t-is-captured', 'false');
		});
	});
});