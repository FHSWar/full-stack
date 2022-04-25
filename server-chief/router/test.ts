logger.info('logger 文件在 shared 项目中');
logger.trace('global STATUS SUCCESS', STATUS.SUCCESS);

router.get('/test', (ctx, next) => {
	ctx.body = 'test';
	next();
});

export default router;
