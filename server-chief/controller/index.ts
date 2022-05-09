import { getFileRecursively } from 'shared';
import type { KoaInstance } from '@util';

// 第一层不需要读取 config 目录，可拓展，暂不需要
const toIgnoreDirArr = [{ layer: 1, nameArr: ['config'] }];

// 通过动态引入路由文件，免去手动注册的步骤，方便开发
export const useRouter = (app:KoaInstance) => {
	const routerFileArr = getFileRecursively(__dirname, toIgnoreDirArr, true)
		.filter((item) => item !== undefined);
	app.use(routerFileArr.at(-1).routes());
	// console.log('routerFileArr', routerFileArr[0] === routerFileArr[1]);
	// routerFileArr.forEach((splitRouter) => app.use(splitRouter.routes()));
};
