
import styled from 'styled-components';
import { GridItem } from '..';
import { CompletedFlyer } from '../../types';

type GridProps = {
	flyers: CompletedFlyer[];
	className?: string;
	bookmarkedFlyers: string[],
	addFlyer: (id: number) => void, 
	removeFlyer: (id: number) => void
}

export function Grid({flyers, bookmarkedFlyers, addFlyer, removeFlyer, className = ''}: GridProps) {

	return <Wrapper id={'flyers-grid'} className={className}>
		{flyers.map((flyer) => {
			const {id} = flyer;
			const isBookmarked = bookmarkedFlyers?.includes(String(id)) || false;
			return <GridItem 
				key={id} 
				flyer={flyer} 
				isBookmarked={isBookmarked}
				addFlyer={addFlyer}
				removeFlyer={removeFlyer}
			/>;
		})}
	</Wrapper>;

}


const Wrapper = styled.main`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-auto-columns: auto;
	grid-auto-flow: row dense;
	grid-gap: 1rem;
`;