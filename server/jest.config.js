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
	},
	collectCoverage: true, // 开启覆盖率
	coverageDirectory: 'public/static/coverage', // 指定生成覆盖率报告文件存放位置
	coverageProvider: 'v8' // 不用管
};