import { router } from '@/router';
import { useStore } from '@/stores';

export const useLogout = () => {
	const store = useStore();

	router.push({ name: 'login' });
	store.$reset();
	setTimeout(() => {
		sessionStorage.clear();
		localStorage.clear();
		// store.$reset(); 之后这个不为空，手动清一下
		store.visitedRoutes = [];
	}, 0);
};
