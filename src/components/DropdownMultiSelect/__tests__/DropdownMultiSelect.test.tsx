import { render } from '@testing-library/react';
import {DropdownMultiSelect} from '../DropdownMultiSelect';

describe('Drawer', () => {

	const mockList = ['mockitem1', 'mockitem2', 'mockitem3'];
	const setFilter = jest.fn();
	describe('when the drawer is rendered as multiselection', () => {
		
		it('should have a consistent snapshot', () => {
			const {container} = render(<DropdownMultiSelect 
				list={mockList} 
				defaultValue='mockdefaultvalue' 
				variant='multi' 
				setFilter={setFilter}/>
			);
			expect(container).toMatchSnapshot();
		});

	});

	describe('when the drawer is rendered as single selection', () => {
		
		it('should have a consistent snapshot', () => {
			const {container} = render(<DropdownMultiSelect 
				list={mockList} 
				defaultValue='mockdefaultvalue' 
				variant='single' 
				setFilter={setFilter}/>
			);
			expect(container).toMatchSnapshot();
		});

	});
	
});