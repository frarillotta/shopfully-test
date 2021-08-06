module.exports = {
	reactStrictMode: true,
	react: {
		useSuspense: true,
		wait: true
	},
	images: {
		domains: ['it-it-media.shopfully.cloud']
	},
	excludeFile: (str) => /\*.{spec,test}.tsx/.test(str)
};
