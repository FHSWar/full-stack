import { defineStore } from 'pinia';

export const useStore = defineStore('common', {
	state: () => ({
		token: localStorage.getItem('token') || ''
	})
});
