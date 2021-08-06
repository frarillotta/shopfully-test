export function toMap(data: {id: number, name: string}[]) {

	return data.reduce((accumulator, currentValue) => (

		accumulator.set(currentValue.id, currentValue.name),
		accumulator

	), new Map<number, string>());

}