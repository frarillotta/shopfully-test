import { render } from '@testing-library/react';
import {GridItem} from '../GridItem';

describe('GridItem', () => {

	const mockFlyer = {
		'id': 694041,
		'retailer_name': 'mockName',
		'category_name': 'mockName',
		'title': 'Sport acquatici - sup gonfiabile',
		'retailer_id': 3,
		'start_date': '2021-06-01',
		'end_date': '2021-06-30',
		'is_published': 0,
		'asset': 'https://it-it-media.shopfully.cloud/images/volantini/big_694041.jpg',
		'category_id': 7
	};
	const addFlyer = jest.fn();
	const removeFlyer = jest.fn();
	
	describe('when the grid item is rendered and is bookmarked', () => {
		
		it('should have a consistent snapshot', () => {
			const {container} = render(<GridItem
				addFlyer={addFlyer} flyer={mockFlyer} isBookmarked={true} removeFlyer={removeFlyer}
			/>
			);
			expect(container).toMatchSnapshot();
		});

	});
	describe('when the grid item is rendered and is not bookmarked', () => {
		
		it('should have a consistent snapshot', () => {
			const {container} = render(<GridItem
				addFlyer={addFlyer} flyer={mockFlyer} isBookmarked={false} removeFlyer={removeFlyer}
			/>
			);
			expect(container).toMatchSnapshot();
		});

	});
	
});