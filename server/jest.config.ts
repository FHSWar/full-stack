import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => ({
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true, // 开启覆盖率
	coverageDirectory: 'public/static/coverage', // 指定生成覆盖率报告文件存放位置
	coverageProvider: 'v8', // 不用管
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/$1',
		'test/(.*)': '<rootDir>/test/$1'
	},
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	verbose: true
});