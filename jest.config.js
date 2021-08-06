module.exports = {
	testEnvironment: 'jsdom',
	testMatch: [
		'**/__tests__/*.test.js',
		'**/__tests__/*.test.ts',
		'**/__tests__/*.test.tsx',
	],
	setupFilesAfterEnv: ['./jest.setup.js'],
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
	},
	testPathIgnorePatterns: [
		'/node_modules/',
		'.next'
	]
};