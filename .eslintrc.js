module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'airbnb-base'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		'comma-dangle': ['error', 'never'],
		'consistent-return': 'off', // 不强制需要return
		'eol-last': 'off', // 代码尾部不需要带空行
		'func-names': 'off', // 允许匿名函数
		'global-require': 'off', // 要求require出现在顶层中
		'import/extensions': 'off', // 关闭第三方插件校验
		'import/no-dynamic-require': 'off',
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }], // 使用tab，间距对switch特异用2两个tab处理
		'max-len': ['error', { code: 120 }], // 代码长度不超过120
		'no-bitwise': 'off', // 检查未定义先设置为off
		'no-console': 'off',
		'no-continue': 'off',
		'no-debugger': 'off',
		'no-plusplus': 'off', // 允许使用++ --
		'no-prototype-builtins': 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-undef': 'off',
		'no-param-reassign': 0,
		'no-restricted-syntax': 'off', // 允许 for...of 之类的语法
		'no-unused-expressions': 'off', // 优雅三元可以有
		'object-curly-spacing': ['error', 'always'], // {}头尾留空格
		'prefer-destructuring': 'off',
		quotes: ['error', 'single'],
		semi: ['error', 'always'] // 代码尾部必须带分号
	}
};
