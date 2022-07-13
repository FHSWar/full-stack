const router = useRouter();

router.get('auth/api-permission', async (ctx) => {
	toCliect(ctx, '调通再说');
});

router.post('auth/api-permission', async (ctx) => {
	toCliect(ctx, '增加接口');
});

export default router;