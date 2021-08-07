import { render } from '@testing-library/react';
import {SearchInput} from '../SearchInput';

describe('SearchInput', () => {

	const mockQueries = ['asd', 'dfg', 'fgh'];
	const setQuery = jest.fn();
	
	describe('when the SearchInput is rendered', () => {
		
		it('should have a consistent snapshot', () => {
			const {container} = render(<SearchInput
				label={'mockLabel'} setQuery={setQuery} queries={mockQueries}
			/>
			);
			expect(container).toMatchSnapshot();
		});

	});
	
});