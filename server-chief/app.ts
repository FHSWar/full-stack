import Koa from 'koa';
import cors from '@koa/cors';

// 这个不在最上方引入，就会有其他ts文件只有函数体内才能访问全局变量的问题
import './util';
import { useMongo } from './model';
import { useRouter } from './router';

const app = new Koa();
app.use(cors());

useMongo();
useRouter(app);

app.listen(9000);
