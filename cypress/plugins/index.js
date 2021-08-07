// *********************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// *********************

// enables win.gc() for chrome
module.exports = (on, config) => {
	on('before:browser:launch', (browser, launchOptions) => {
		if (browser.name === 'chrome') {
			// exposes window.gc() function that will manually force garbage collection
			launchOptions.args.push('--js-flags=--expose-gc');
		}

		return launchOptions;
	});
	
};