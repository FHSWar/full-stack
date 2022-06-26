import { PassThrough } from 'stream';
import { isTest } from '@/config';

const router = useRouter();

// https://javascript.info/server-sent-events
router.get('sse', async (ctx) => {
	ctx.set({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache'
	});

	const stream = new PassThrough();

	ctx.status = 200;
	ctx.body = stream;

	const interval = setInterval(() => {
		stream.write(`data: ${new Date()}\n\n`);
	}, 1000);

	stream.on('close', () => {
		clearInterval(interval);
		console.log('event stream closed');
	});

	// 跑单测的话要手动关掉，简单但是重要
	if (isTest) setTimeout(() => { ctx.res.end(); }, 1500);

	// 用了 next 前端就报错了
	// await next();
});

export default router;