module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:vue/essential',
		'airbnb-base'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: [
		'vue',
		'@typescript-eslint'
	],
	rules: {
		'comma-dangle': ['error', 'never'],
		'consistent-return': 'off', // 不强制需要return
		'func-names': 'off', // 允许匿名函数
		'global-require': 'off', // 要求require出现在顶层中
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }], // 使用tab，间距对switch特异用2两个tab处理
		'max-len': ['error', { code: 120 }], // 代码长度不超过120
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
		quotes: ['error', 'single'], // 单引号String
		'vue/max-attributes-per-line': ['error', {
			singleline: { max: 3 },
			multiline: { max: 5 }
		}],
		'vue/max-len': ['error', { code: 120 }], // 代码长度不超过120
		'vue/singleline-html-element-content-newline': 0,
		'vue/multi-word-component-names': ['error', { ignores: ['index'] }],
		'vue/mustache-interpolation-spacing': 'off', // 模板中花括号不需要左右留空
		'vue/no-v-html': 'off' // 允许使用v-html
	}
};
