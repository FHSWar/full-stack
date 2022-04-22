import Router from '@koa/router';
import { PassThrough } from 'stream';

const router = new Router();
if (router) console.log('chief router init');

router.get('/sse', async (ctx) => {
	// 这个不加也能跑
	// ctx.request.socket.setTimeout(0);
	// ctx.req.socket.setNoDelay(true);
	// ctx.req.socket.setKeepAlive(true);

	ctx.set({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		Connection: 'keep-alive'
	});

	const stream = new PassThrough();

	ctx.status = 200;
	ctx.body = stream;

	const interval = setInterval(() => {
		stream.write(`data: ${new Date()}\n\n`);
	}, 1000);

	stream.on('close', () => {
		clearInterval(interval);
	});
	// 用了 next 就报错了
	// await next().catch(() => { ctx.body = ctx.state.mwCalled; });
});

export default router;