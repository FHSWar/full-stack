console.log('global STATUS SUCCESS', STATUS.SUCCESS);

router.get('/test', (ctx, next) => {
	ctx.body = 'test';
	next();
});

export default router;
