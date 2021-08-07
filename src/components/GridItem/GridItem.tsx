import styled from 'styled-components';
import Image from 'next/image';
import { CompletedFlyer } from '../../types';
import { Heart } from '../SVGs/Heart';
import { memo } from 'react';

type GridItemProps = {
	flyer: CompletedFlyer,
	isBookmarked: boolean,
	addFlyer: (flyerId: number) => void,
	removeFlyer: (flyerId: number) => void
};


export const GridItem = memo(({ flyer, isBookmarked, addFlyer, removeFlyer }: GridItemProps) => {
	const { id, title, retailer_name, category_name, asset } = flyer;

	return <Wrapper>
		<NextImage
			src={asset} 
			height={175} 
			width={250}
			alt={'waiting'}
		/>		
		<Description>
			<RetailerName id={'flyer-retailer-name'}>
				{retailer_name}
			</RetailerName>
			<Title id={'flyer-title'}>
				{title}
			</Title>
			<CategoryName id={'flyer-category-name'}>
				{category_name}
			</CategoryName>
			<Bookmarked  data-t={`flyer-is-bookmarked=${isBookmarked}`} isBookmarked={isBookmarked} onClick={() => isBookmarked ? removeFlyer(id) : addFlyer(id)}>
				<Heart size={28}></Heart>
			</Bookmarked>
		</Description>
	</Wrapper>;
});
GridItem.displayName = 'GridItem';

const Wrapper = styled.article`
	display: grid;
	height: 350px;
	width: 100%;
	overflow: hidden;
	grid-template-rows: repeat(2, 1fr);
	grid-template-areas: 
		"picture"
		"description";
	border-radius: 5px;
	box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);

`;

const NextImage = styled(Image)`
	grid-area: picture;
	object-fit: cover;
	object-position: left top;
`;

const Description = styled.div`

	grid-area: description;
	display: flex;
	flex-direction: column;
	padding: 20px;
	gap: 10px;
	justify-content: space-between;
`;

const RetailerName = styled.span`

`;


const Title = styled.span`
	font-size: 1.2rem;
	font-weight: bold;
`;


const CategoryName = styled.span`
	font-size: 0.8rem;
	color: grey;
`;

const Bookmarked = styled.button`
	width: 30px;
	fill: ${props => props.isBookmarked ? 'red' : 'grey'};
	background-color: white;
`;