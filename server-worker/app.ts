import Koa from 'koa';
import cors from '@koa/cors';
import './router';
import './web-socket';

const app = new Koa();

app.use(cors());

app.use((ctx) => {
	ctx.body = 'Hello Koa from chief';
});

app.listen(9001);
