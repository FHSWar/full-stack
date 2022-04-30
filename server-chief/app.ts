import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

// 这个不在最上方引入，就会有其他ts文件只有函数体内才能访问全局变量的问题
import './util';
import { useMongo } from './model';
import { useRouter } from './router';

const app = new Koa();
app.use(cors()); // 解决服务端报跨域问题
app.use(bodyParser()); // 处理 post 请求体

useMongo();
useRouter(app);

app.listen(9000);
