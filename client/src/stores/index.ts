import { defineStore } from 'pinia';

type MenuTree = {
    children: MenuTree
    icon?: string // 用不了 keyof typeof Icons
    id: string
    page?: string
    pid?: string
    title: string
}[];

export const useStore = defineStore('common', {
	state: () => ({
		token: localStorage.getItem('token') || '',
		breadcrumb: [] as MenuTree
	})
});
