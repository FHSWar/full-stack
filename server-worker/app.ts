import Koa from 'koa';
import cors from '@koa/cors';
import {test} from 'shared'
import './src/router';
import './src/web-socket';

const app = new Koa();
console.log(test, 'test')
app.use(cors());

app.use((ctx) => {
	ctx.body = 'Hello Koa from chief';
});

app.listen(9001);
