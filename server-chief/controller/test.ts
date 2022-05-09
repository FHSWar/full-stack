// logger.info('logger 文件在 shared 项目中');
// logger.trace('global STATUS SUCCESS', STATUS.SUCCESS);

router.get('test', (ctx, next) => {
	toCliect(ctx, '顺利测试一个！');
	next();
});

export default router;