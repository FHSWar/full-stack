import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';

import {
	checkPermission,
	mountGlobal,
	staticDir,
	useJWT,
	useRoutes
} from '@util';

// 这个不在最上方引入，就会有其他ts文件只有函数体内才能访问全局变量的问题
mountGlobal();

const app = new Koa();
app
	.use(cors()) // 解决服务端报跨域问题
	.use(bodyParser()) // 处理 post 请求体
	.use(checkPermission()) // 自定义鉴权
	.use(serve(staticDir)); // 提供静态资源访问

useJWT(app);
useRoutes(app);

export const server = app.listen(9000);
