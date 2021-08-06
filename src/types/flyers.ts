export type Flyers = Flyer[]

export type Flyer = {
	id: number,
	title: string,
	retailer_id: number,
	start_date: string,
	end_date: string,
	is_published: number,
	asset: string,
	category_id: number
}

export interface CompletedFlyer extends Flyer {
	retailer_name: string,
	category_name: string
}