import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/home-page.vue';
import One from '@/views/one.vue';
import Two from '@/views/two.vue';
import Three from '@/views/three.vue';
import SubApp from '@/views/sub-app-vue2.vue';

export const mainPanelRoutes:RouteRecordRaw[] = [
	{
		path: '',
		// main-panel的默认页面
		component: HomePage
	},
	{
		path: 'one',
		name: 'one',
		component: One
	},
	{
		path: 'two',
		name: 'two',
		component: Two
	},
	{
		path: 'three',
		name: 'three',
		component: Three
	},
	{
		path: 'vue2',
		name: 'vue2',
		component: SubApp
	}
];
