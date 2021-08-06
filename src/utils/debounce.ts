function debounce(func: Function, wait: number): () => void {
	let timeout;
	return function() {
		const args = arguments;
		const later = () => {
			timeout = null;
			func(args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export { debounce };