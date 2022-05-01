import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@/*': resolve(__dirname, './src/*'),
			api: resolve(__dirname, './src/api/'),
			utils: resolve(__dirname, './src/utils/')
		}
	}
});
