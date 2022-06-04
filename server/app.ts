import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import { useRoutes } from 'controller';
import {
	checkPermission,
	checkJWTValidity,
	mountGlobal,
	serveStatic,
	useMongo,
	useJWT
} from '@util';

// 这个不在最上方引入，就会有其他ts文件只有函数体内才能访问全局变量的问题
mountGlobal();
const app = new Koa();
app.use(cors()); // 解决服务端报跨域问题
app.use(bodyParser()); // 处理 post 请求体
app.use(checkPermission());
app.use(checkJWTValidity());

serveStatic(app);
useJWT(app);
useMongo();
useRoutes(app);

export const server = app.listen(9000);
