import { connect, model } from 'mongoose';
import { getFileRecursively } from 'shared';

// 读取出所有 model 定义文件
const modelFileArr = getFileRecursively(__dirname, []);

// 组装出 model 大对象
const assembleModel = (filePathArr: string[]) => filePathArr.reduce((acc, cur:any) => {
	Object.keys(cur).forEach((key) => { acc[key] = cur[key]; });
	return acc;
}, {} as any);

const models = assembleModel(modelFileArr);

// 遍历注册 model
export const useMongo = async () => {
	await connect('mongodb://localhost/fhswar');

	const modelKeys = Object.keys(models);
	modelKeys.forEach((modelKey) => { model(modelKey, models[modelKey]); });
};