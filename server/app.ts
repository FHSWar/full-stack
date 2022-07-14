import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import { isTest } from '@/config';
import {
	guardLoginState,
	guardRestrictedApi,
	mountGlobal,
	staticDir,
	useJWT,
	useMongo,
	useRedis,
	useRoutes,
	useSchedule,
	useWebSocket
} from '@/util';

// 这个不在最上方引入，就会有其他ts文件只有函数体内才能访问全局变量的问题
mountGlobal();

const app = new Koa();
app
	.use(cors()) // 解决服务端报跨域问题
	.use(bodyParser()) // 处理 post 请求体
	.use(guardLoginState()) // 接口都需要登陆态，除非是注册或者登陆
	.use(guardRestrictedApi()) // 自定义鉴权
	.use(serve(staticDir)); // 提供静态资源访问

useJWT(app); // 使用JWT
useRoutes(app); // 使用接口路由
useRedis(); // 使用redis
useSchedule(); // 启用定时任务
useWebSocket(); // 启用web-socket
if (!isTest) useMongo(); // 单测环境要另外启动，这和commonJS同步的文件导入策略有关

export const server = app.listen(9000);
