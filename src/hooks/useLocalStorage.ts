import { useCallback, useEffect, useState } from 'react';
import { setItem, getItem } from '../utils';

const useLocalStorage = () => {

	const [bookmarkedFlyersIds, setBookmarkedFlyers] = useState<string[] | null>(null);

	useEffect(()=>{
		const storageItems = getItem('flyers') || [];
		setBookmarkedFlyers((currentBookmarkedFlyers) => {
			const flyers = currentBookmarkedFlyers || [];
			return [...flyers, ...storageItems];
		});
	}, []);

	useEffect(()=>{
		setItem('flyers', bookmarkedFlyersIds || []);
	}, [bookmarkedFlyersIds]);

	const addFlyer = useCallback((flyerId: number) => {
		setBookmarkedFlyers((currentBookmarkedFlyers) => {
			if (currentBookmarkedFlyers.includes(String(flyerId))) return;
			return [...currentBookmarkedFlyers, String(flyerId)];
		});
	}, []);

	const removeFlyer = useCallback((flyerId: number) => {
		setBookmarkedFlyers((currentBookmarkedFlyers)=> {
			const elToRemoveIndex = currentBookmarkedFlyers.indexOf(String(flyerId));
			const bookmarkedFlyersCopy = [...currentBookmarkedFlyers];
			if (elToRemoveIndex > -1) {
				bookmarkedFlyersCopy.splice(elToRemoveIndex, 1);
			}
			return bookmarkedFlyersCopy;
		});
	}, []);

	return { bookmarkedFlyersIds, addFlyer, removeFlyer };

};

export { useLocalStorage };