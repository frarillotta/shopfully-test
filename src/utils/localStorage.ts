const setItem = (key, storeValue) => {
    
	if(!localStorage) return;

	localStorage.setItem(key, JSON.stringify(storeValue));

};

const getItem = (key: string) => {

	if(!window?.localStorage) return;

	return JSON.parse(window.localStorage.getItem(key)) || [];

};

export {setItem, getItem};