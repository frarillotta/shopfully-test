describe('filter flyers', () => {
	
	describe('when filtering by category', () => {
		it('should only display filtered flyers', () => {
			cy.visit('http://localhost:3000');
			cy.get('#filter-category:first-of-type').click();
			let firstElLabel;
			cy.get('#multiselect-dropdown-option-0>span>label').then(($el) => {
				firstElLabel = $el.text();
			});
			cy.get('#multiselect-dropdown-option-0>span>input').click();
			cy.get('#flyer-category-name').each(($el)=>{
				cy.wrap($el).should('contain.text', firstElLabel);
			});
		});
	});
	describe('when filtering by retailer', () => {
		it('should only display filtered flyers', () => {
			cy.visit('http://localhost:3000');
			cy.get('#filter-retailer').click();
			let firstElLabel;
			cy.get('#multiselect-dropdown-option-0>span>label').then(($el) => {
				firstElLabel = $el.text();
			});
			cy.get('#multiselect-dropdown-option-0>span>input').click();
			cy.get('#flyer-retailer-name').each(($el)=>{
				cy.wrap($el).should('contain.text', firstElLabel);
			});
		});
	});

	describe('when filtering by query', () => {
		it('should only display filtered flyers', () => {
			const exampleText = 'gu';
			cy.visit('http://localhost:3000');
			cy.get('#flyer-search>div>input').type(exampleText);
			cy.wait(500);
			cy.get('#flyer-title').each(($el)=>{
				cy.wrap($el).contains(exampleText, { matchCase: false });
			});
		});
	});

});