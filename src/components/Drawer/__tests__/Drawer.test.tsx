import { render } from '@testing-library/react';
import {Drawer} from '../Drawer';

describe('Drawer', () => {
	let elWithoutCallback;
	let elWithCallback;

	beforeEach(()=>{
		elWithoutCallback = {
			addEventListener: jest.fn()
		};
		elWithCallback = {
			addEventListener: jest.fn((event, callback) => {
				if (event === 'click') {
					callback();
				}
		  	})
		};
	});
	
	describe('when the drawer is rendered', () => {
		
		it('should have a consistent snapshot', () => {
			const {container} = render(<Drawer openerEl={elWithoutCallback}><div>mock content</div></Drawer>);
			expect(container).toMatchSnapshot();
		});

	});

	describe('when the drawer is opened', () => {
		
		it('should have a consistent snapshot', () => {
			const {container} = render(<Drawer openerEl={elWithCallback}><div>mock content</div></Drawer>);
			expect(container).toMatchSnapshot();
		});

	});
	
});