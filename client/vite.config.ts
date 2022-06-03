import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		vue(),
		vueJsx(), // 增加tsx支持，写复杂模版可以用一下
		legacy() // 老旧浏览器支持，默认没有ie11，可以使用诸如Array.prototype.at()
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src/')
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					'element-plus': ['element-plus'],
					'personnel-management': [
						'./src/views/personnel-management/menu-configuration/index.vue',
						'./src/views/personnel-management/role.vue',
						'./src/views/personnel-management/user.vue'
					]
				}
			}
		}
	}
});
