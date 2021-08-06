import { CompletedFlyer } from './../types/flyers';
import { Flyers } from './../types';

export function decorateFlyers(flyers: Flyers, categories: Map<number, string>, retailers: Map<number, string>) {

	const completeFlyers: CompletedFlyer[] = flyers.map((flyer)=> {
		const retailer_name = retailers.get(flyer.retailer_id);
		const category_name = categories.get(flyer.category_id);

		return {...flyer, retailer_name, category_name };
	});

	return completeFlyers;

}