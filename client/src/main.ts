import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import './assets/style/reset.css';
import 'element-plus/dist/index.css';
import router from './router';
import app from './app.vue';

createApp(app)
	.use(ElementPlus, { locale: zhCn })
	.use(router)
	.mount('#app');
