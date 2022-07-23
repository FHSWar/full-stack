import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import './assets/style/reset.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/assets/style/customize-theme-var.css';

import { router } from '@/router/index';
import app from '@/app.vue';
import MainDiv from '@/components/main-div.vue';
import { useIcon } from '@/components/use-icon';

createApp(app)
	.component('main-div', MainDiv)
	.component('use-icon', useIcon)
	.use(ElementPlus, {
		locale: zhCn
	})
	.use(router)
	.use(createPinia())
	.mount('#app');
