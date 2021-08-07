import { render } from '@testing-library/react';
import {Grid} from '../Grid';

describe('Grid', () => {

	const mockList = ['mockitem1', 'mockitem2', 'mockitem3'];
	const mockBookmarkedFlyers = ['694041', '456', '693000'];
	const mockFlyers = [{
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
	},
	{
		'id': 693000,
		'retailer_name': 'mockName',
		'category_name': 'mockName',
		'title': 'Il gusto dellestate.',
		'retailer_id': 23,
		'start_date': '2021-06-10',
		'end_date': '2021-06-20',
		'is_published': 1,
		'asset': 'https://it-it-media.shopfully.cloud/images/volantini/big_693000.jpg',
		'category_id': 6
	},
	{
		'id': 692671,
		'retailer_name': 'mockName',
		'category_name': 'mockName',
		'title': 'Promozione Purina',
		'retailer_id': 15,
		'start_date': '2021-06-03',
		'end_date': '2021-06-30',
		'is_published': 0,
		'asset': 'https://it-it-media.shopfully.cloud/images/volantini/big_692671.jpg',
		'category_id': 5
	}];
	const addFlyer = jest.fn();
	const removeFlyer = jest.fn();
	
	describe('when the grid is rendered', () => {
		
		it('should have a consistent snapshot', () => {
			const {container} = render(<Grid 
				addFlyer={addFlyer} bookmarkedFlyers={mockBookmarkedFlyers} flyers={mockFlyers} removeFlyer={removeFlyer}
			/>
			);
			expect(container).toMatchSnapshot();
		});

	});
	
});