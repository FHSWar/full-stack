import Koa from 'koa';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

type KoaInstance = Koa<Koa.DefaultState, Koa.DefaultContext>

const checkIsDir = (name:string, root:string = __dirname) => statSync(join(root, name)).isDirectory();

// 获取符合条件的所有路由文件
const getAllRouterFiles = (dir:string) => {
	const routerFilePathArr:string[] = [];

	// 第一层不需要读取 config 目录，可拓展
	const shouldIgnoreDirArr = [{ layer: 1, nameArr: ['config'] }];

	const getFiles = (innerDir:string, layer:number) => {
		layer++;
		const { nameArr } = shouldIgnoreDirArr
			.find(({ layer: innerLayer }) => innerLayer === layer) || {};
		const arr = readdirSync(innerDir);
		const dirNameArr = arr.filter((name) => checkIsDir(name, innerDir));
		const fileNameArr = arr.filter((name) => !checkIsDir(name, innerDir));

		if (layer === 1) {
			const arrWithoutIndex = fileNameArr.filter((name) => name !== 'index.ts');
			const paths = arrWithoutIndex.map((name) => `${innerDir}/${name}`);
			routerFilePathArr.push(...paths);
		} else {
			routerFilePathArr.push(...fileNameArr.map((name) => `${innerDir}/${name}`));
		}

		if (nameArr) {
			dirNameArr
				.filter((dirName) => !nameArr.includes(dirName))
				.forEach((item) => getFiles(`${innerDir}/${item}`, layer));
		}
	};
	getFiles(dir, 0);

	return routerFilePathArr.map((routerFilePath) => require(routerFilePath));
};

// 通过动态引入路由文件，免去手动注册的步骤，方便开发
export const useRouter = (app:KoaInstance) => {
	const routerFileArr = getAllRouterFiles(__dirname);
	routerFileArr.forEach((splitRouter) => app.use(splitRouter.default.routes()));
};
