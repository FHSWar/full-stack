import { useRouter } from 'vue-router';
import { useStore } from '@/stores';

export const useLogout = (router: ReturnType<typeof useRouter>) => {
	const store = useStore();

	router.push({ name: 'login' });
	store.$reset();
	localStorage.clear();
};
