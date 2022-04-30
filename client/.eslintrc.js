module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:vue/vue3-strongly-recommended',
		'airbnb-base'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint',
		'vue'
	],
	rules: {
		indent: ['error', 'tab', {
			SwitchCase: 1
		}], // 使用tab，间距对switch特异用2两个tab处理
		quotes: ['error', 'single'], // 单引号String
		'comma-dangle': ['error', 'never'],
		'consistent-return': 'off', // 不强制需要return
		'func-names': 'off', // 允许匿名函数
		'global-require': 'off', // 要求require出现在顶层中
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/prefer-default-export': 'off',
		'max-len': ['error', {
			code: 120
		}], // 代码长度不超过120
		'no-console': 'off',
		'no-continue': 'off',
		'no-debugger': 'off',
		'no-plusplus': 'off', // 允许使用++ --
		'no-prototype-builtins': 'off',
		'no-tabs': ['error', {
			allowIndentationTabs: true
		}],
		'no-undef': 'off',
		'no-param-reassign': 0,
		'no-restricted-syntax': 'off', // 允许 for...of 之类的语法
		'no-unused-expressions': 'off', // 优雅三元可以有
		'object-curly-spacing': ['error', 'always'], // {}头尾留空格
		'object-curly-newline': ['error', {
			ObjectExpression: 'always',
			ObjectPattern: {
				multiline: true
			},
			ImportDeclaration: 'never',
			ExportDeclaration: {
				multiline: true, minProperties: 6
			}
		}],
		'prefer-destructuring': 'off',
		'vue/max-attributes-per-line': ['error', {
			singleline: {
				max: 4
			},
			multiline: {
				max: 5
			}
		}],
		'vue/multi-word-component-names': ['error', {
			ignores: ['index']
		}]

	}
};
