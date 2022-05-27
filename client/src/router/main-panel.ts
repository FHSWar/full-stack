import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/home-page.vue';
import One from '@/views/one.vue';
import Two from '@/views/two.vue';
import Three from '@/views/three.vue';
import MenuConfiguration from '@/views/personnel-management/menu-configuration/index.vue';
import Role from '@/views/personnel-management/role.vue';
import User from '@/views/personnel-management/user.vue';

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
		path: 'role',
		name: 'role',
		component: Role
	},
	{
		path: 'user',
		name: 'user',
		component: User
	},
	{
		path: 'menu',
		name: 'menu',
		component: MenuConfiguration
	}
];
