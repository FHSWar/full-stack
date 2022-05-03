import { RouteRecordRaw } from 'vue-router';
import One from '@/views/test/one.vue';
import Two from '@/views/test/two.vue';
import Three from '@/views/test/three.vue';

export const mainPanelRoutes:RouteRecordRaw[] = [
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
	}
];
