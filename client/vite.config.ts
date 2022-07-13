/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// 1M左右
					'element-plus': ['element-plus'],
					'personnel-management': [
						'./src/views/personnel-management/api-permission/index.vue',
						'./src/views/personnel-management/menu/index.vue',
						'./src/views/personnel-management/role.vue',
						'./src/views/personnel-management/user.vue'
					]
				}
			}
		}
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src/')
		}
	},
	plugins: [
		vue({
			customElement: ['use-icon']
		}),
		// 增加tsx支持，写复杂模版可以用一下
		vueJsx(),
		// 老旧浏览器支持，默认没有ie11，使构建产物支持诸如可选链等新语法，会使包体积增大约十分之一，但会按需
		legacy()
	],
	test: {}
});
