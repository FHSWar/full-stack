import { defineStore } from 'pinia';
import type { MenuList } from '@/types';

export const useStore = defineStore('common', {
	state: () => ({
		token: localStorage.getItem('token') || '',
		breadcrumb: [] as MenuList
	})
});
