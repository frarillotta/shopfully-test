
describe('bookmark flyers', () => {
	const exampleFlyerId = '694041';
	describe('when setting a flyer as bookmarked', () => {
		it('should add it to bookmarked flyers if not previously bookmarkd', () => {
			cy.visit('http://localhost:3000');
			cy.get(`#flyer-${exampleFlyerId}>#flyer-description > button`).click();
			cy.get(`#flyer-${exampleFlyerId}>#flyer-description > button`).should('have.attr', 'data-t-flyer-is-bookmarked', 'true');
		});
		it('should remove it if already bookmarked', () => {
			cy.visit('http://localhost:3000');
			cy.get(`#flyer-${exampleFlyerId}>#flyer-description > button`).click();
			cy.get(`#flyer-${exampleFlyerId}>#flyer-description > button`).click();
			cy.get(`#flyer-${exampleFlyerId}>#flyer-description > button`).should('have.attr', 'data-t-flyer-is-bookmarked', 'false');
		});

		it('should appear in the drawer when bookmarked', () => {
			cy.visit('http://localhost:3000');
			cy.get('#flyer-694041>#flyer-description > button').click();
			cy.get('#drawer-opener').click();
			cy.get(`[data-t-drawer-flyer=${exampleFlyerId}]`).should('exist');
		});

		it('should remove it from the grid when removed from the drawer', () => {
			cy.visit('http://localhost:3000');
			cy.get('#flyer-694041>#flyer-description > button').click();
			cy.get('#drawer-opener').click();
			cy.get(`[data-t-drawer-flyer=${exampleFlyerId}]`).should('exist');
			cy.get(`[data-t-drawer-flyer=${exampleFlyerId}]>#drawer-flyers-icon`).click();
			cy.get(`[data-t-drawer-flyer=${exampleFlyerId}]`).should('not.exist');
			cy.get(`#flyer-${exampleFlyerId}>#flyer-description > button`).should('have.attr', 'data-t-flyer-is-bookmarked', 'false');
		});
	});
});