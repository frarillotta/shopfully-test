import { render } from '@testing-library/react';
import Homepage from '../pages';

describe('Homepage', () => {

	jest.mock('next/image');
	
	it('should have a consistent snapshot', () => {

		const {container} = render(
			<Homepage/>);
		expect(container).toMatchSnapshot();
	});
	
});