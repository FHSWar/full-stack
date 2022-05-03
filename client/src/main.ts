import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import './assets/style/reset.css';
import 'element-plus/dist/index.css';

import { router } from '@/router/index';
import app from '@/app.vue';
import { useIcon } from '@/components/use-icon';

createApp(app)
	.component('use-icon', useIcon)
	.use(ElementPlus, {
		locale: zhCn
	})
	.use(router)
	.use(createPinia())
	.mount('#app');
