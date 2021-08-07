import Head from 'next/head';
import styled from 'styled-components';
import { getFlyers, getCategories, getRetailers } from '../API';
import { toMap, decorateFlyers } from '../utils';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks';
import { SearchInput, Drawer, Grid, DropdownMultiSelect, Dehaze, Heart } from '../components';

export default function Home() {

	const [activeFilters, setActiveFilters] = useState({
		categories: [],
		retailers: [],
		endDate: null,
		query: ''
	});

	const drawerOpenerRef = useRef();

	const { bookmarkedFlyersIds, addFlyer, removeFlyer } = useLocalStorage();
	const categories = useMemo(() => toMap(getCategories()), []);
	const categoriesArray = useMemo(() => Array.from(categories.values()), []);
	const retailers = useMemo(() => toMap(getRetailers()), []);
	const retailersArray = useMemo(() => Array.from(retailers.values()), []);
	let flyers = useMemo(() => decorateFlyers(getFlyers(), categories, retailers), []);
	const flyerTitles = useMemo(() => flyers.map(flyer => flyer.title), []);
	const flyerEndDates = useMemo(() => Array.from(new Set(flyers.map(flyer => flyer.end_date))), []);
	const bookmarkedFlyers = useMemo(() => 
		flyers.filter((flyer) => bookmarkedFlyersIds?.indexOf(String(flyer.id)) > -1)
	, [bookmarkedFlyersIds]);

	if (activeFilters.categories.length > 0) {
		flyers = flyers.filter((flyer) => activeFilters.categories.indexOf(flyer.category_name) > -1);
	};

	if (activeFilters.retailers.length > 0) {
		flyers = flyers.filter((flyer) => activeFilters.retailers.indexOf(flyer.retailer_name) > -1);
	};
	
	if (activeFilters.query.length > 0) {
		flyers = flyers.filter((flyer) => 
			flyer.title.toLowerCase().includes(activeFilters.query.toLowerCase())
		);
	};

	if (activeFilters.endDate) {
		const date = new Date(activeFilters.endDate);
		flyers = flyers.filter((flyer) => 
			new Date(flyer.end_date) <= date
		);
	};

	return (
		<>
			<Head>	
				<title>Shopfully demo</title>
				<meta name="description" content='Shopfully demo'></meta>
			</Head>
			<Header>
				<DrawerButton id={'drawer-opener'} ref={drawerOpenerRef}>
					<Dehaze/>
				</DrawerButton>
				<HeaderTitle>
					ShopFully
				</HeaderTitle>
			</Header>
			<SearchWrapper>
				<SearchInput
					label={'Search a Flyer'} 
					queries={flyerTitles} 
					setQuery={(query)=> setActiveFilters((activeFilters) => ({...activeFilters, query: query}))}
				/>
			</SearchWrapper>
			<DropdownsWrapper>
				<DropdownMultiSelect 
					defaultValue={'Category'} 
					list={categoriesArray} 
					setFilter={useCallback((filters: string[]) => { 
						setActiveFilters((activeFilters) => ({...activeFilters, categories: filters}));
					}, [])}
				/>
				<DropdownMultiSelect 
					defaultValue={'Retailer'} 
					list={retailersArray} 
					setFilter={useCallback((filters: string[]) => { 
						setActiveFilters((activeFilters) => ({...activeFilters, retailers: filters}));
					}, [])}
				/>
				<DropdownMultiSelect 
					variant={'single'}
					defaultValue={'Exp. date'} 
					list={flyerEndDates} 
					setFilter={useCallback((filter: string) => { 
						setActiveFilters((activeFilters) => ({...activeFilters, endDate: filter}));
					}, [])}
				/>
			</DropdownsWrapper>
			<FlyersGrid 
				flyers={flyers} 
				bookmarkedFlyers={bookmarkedFlyersIds} 
				addFlyer={addFlyer}
				removeFlyer={removeFlyer}
			/>
			<Drawer 
				openerEl={ drawerOpenerRef.current }
			>
				<DrawerContentWrapper>
					<DrawerHeader>
						<DrawerTitle>
							Favourites
						</DrawerTitle>
						<DrawerSubtitle>
							The list of your preferred flyers
						</DrawerSubtitle>
					</DrawerHeader>
					<DrawerContent>
						{bookmarkedFlyers.map( flyer => {
							const {id, title} = flyer;
							return <DrawerFlyers data-t-drawer-flyer={id} key={id}>
								<DrawerFlyersIcon id={'drawer-flyers-icon'} onClick={() => removeFlyer(id)}><Heart/></DrawerFlyersIcon>
								<DrawerFlyersLabel id={'drawer-label'}>{title}</DrawerFlyersLabel>
							</DrawerFlyers>;
						})}
					</DrawerContent>
				</DrawerContentWrapper>
			</Drawer>
		</>
	);
}

const Header = styled.header`
	display: flex;
	width: 100%;
	background-color: #5d4ede;
	height: 62px;
	align-items: center;
	gap: 12px;
`;

const HeaderTitle = styled.h1`
	color: white;
	font-weight: 100;
	letter-spacing: 1px;
	font-size: 1.3rem;
`;

const SearchWrapper = styled.div`
	padding: 20px 24px 10px 24px;
`;

const FlyersGrid = styled(Grid)`
	padding: 12px 24px;
`;


const DropdownsWrapper = styled.div`
	padding: 8px 24px;
	display: flex;
	gap: 8px;
`;

const DrawerContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const DrawerHeader = styled.header`
	display: flex;
	flex-direction: column;
	padding: 12px 12px 24px 24px;
	margin-top: 64px;
	border-bottom: 1px solid #bebebe;
	gap: 10px;
`;

const DrawerTitle = styled.div`
	font-weight: bold;
    font-size: 1.2rem;
`;

const DrawerSubtitle = styled.div`

`;

const DrawerButton = styled.button`
	background: inherit;
	cursor: pointer;
    height: 36px;
    width: 36px;
    margin: 13px 22px;
	fill: white;
`;

const DrawerContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 28px;
	gap: 24px;
`;

const DrawerFlyers = styled.div`
	display: flex;
	gap: 24px;
	padding: 0px 24px;
	justify-content: center;
	align-items: center;
`;

const DrawerFlyersLabel = styled.div`

`;

const DrawerFlyersIcon = styled.button`
	background: inherit;
	cursor: pointer;
	fill: red;
`;