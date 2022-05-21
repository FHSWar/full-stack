import { router } from '@/router';
import { useStore } from '@/stores';

export const useLogout = () => {
	const store = useStore();

	router.push({ name: 'login' });
	store.$reset();
	localStorage.clear();
};
