module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	moduleNameMapper: {
		'^@util': '<rootDir>/util/',
		'^config': '<rootDir>/config/',
		'^controller': '<rootDir>/controller/',
		'^model/(.*)$': '<rootDir>/model/$1'
	}
};