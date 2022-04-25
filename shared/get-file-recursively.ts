import { readdirSync, statSync } from 'fs';
import { join } from 'path';

type shouldIgnoreDirArr = {
    layer: number,
    nameArr: string[]
}[]

const checkIsDir = (name:string, root:string = __dirname) => statSync(join(root, name)).isDirectory();

// 获取符合条件的所有文件路径
export const getFileRecursively = (
	dirPath:string,
	toIgnoreDirArr:shouldIgnoreDirArr,
	getDefault: boolean = false
) => {
	const filePathArr:string[] = [];

	const getFiles = (innerDir:string, layer:number) => {
		layer++;
		const { nameArr } = toIgnoreDirArr
			.find(({ layer: innerLayer }) => innerLayer === layer) || {};
		const arr = readdirSync(innerDir);
		const dirNameArr = arr.filter((name) => checkIsDir(name, innerDir));
		const fileNameArr = arr.filter((name) => !checkIsDir(name, innerDir));

		if (layer === 1) {
			const arrWithoutIndex = fileNameArr.filter((name) => name !== 'index.ts');
			const paths = arrWithoutIndex.map((name) => `${innerDir}/${name}`);
			filePathArr.push(...paths);
		} else {
			filePathArr.push(...fileNameArr.map((name) => `${innerDir}/${name}`));
		}

		if (nameArr) {
			dirNameArr
				.filter((dirName) => !nameArr.includes(dirName))
				.forEach((item) => getFiles(`${innerDir}/${item}`, layer));
		}
	};
	getFiles(dirPath, 0);

	if (getDefault) return filePathArr.map((filePath) => require(filePath).default);
	return filePathArr.map((filePath) => require(filePath));
};