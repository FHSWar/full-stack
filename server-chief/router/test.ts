import Router from '@koa/router';

const router = new Router();

router.get('/test', (ctx, next) => {
	ctx.body = 'test';
	next();
});

export default router;
