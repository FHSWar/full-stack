import { join } from 'path';
import chalk from 'chalk';
import Router from '@koa/router';
import { getFileRecursively } from 'shared';
import { KoaInstance } from '@util';

// 第一层不需要读取 config 目录，可拓展，暂不需要
const toIgnoreDirArr = [{ layer: 1, nameArr: ['config'] }];
const controllerDir = join(process.cwd(), 'controller');

// 通过动态引入路由文件，免去手动注册的步骤，方便开发
export const useRoutes = (app:KoaInstance) => {
	logger.info(chalk.blue('路由装载中...'));

	const routerFileArr = getFileRecursively(controllerDir, toIgnoreDirArr, true);
	routerFileArr
		.filter((item) => item !== undefined)
		.forEach((splitRouter) => {
			app.use(splitRouter.routes()).use(splitRouter.allowedMethods());
		});

	logger.info(chalk.blue.bold('✨  路由已装载'));
};

export const useRouter = (prefix: string = '/api/') => new Router({ prefix });
