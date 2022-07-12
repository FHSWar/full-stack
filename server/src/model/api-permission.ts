import { model, Schema } from 'mongoose';

interface IApiPermission {
    createdAt: Date
	updatedAt: Date
    isDelete: boolean
}

// model 第一个字符串存到数据库会忽略大小写，因此用下划线区分单词，一开始就写成存储时的命名，减小理解成本
const ApiPermission = model<IApiPermission>('client_routes', new Schema<IApiPermission>(
	{
		isDelete: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
));

export { IApiPermission, ApiPermission };