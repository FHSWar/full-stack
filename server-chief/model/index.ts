import { connect } from 'mongoose';

// 遍历注册 model
export const useMongo = async () => {
	await connect('mongodb://localhost/fhswar');
};
