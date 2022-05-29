import { Types } from 'mongoose';

interface IClientRoutes {
    role: Types.ObjectId
    routesJson: string
    createdAt: Date
	updatedAt: Date
    isDelete: boolean
}

// model 第一个字符串存到数据库会忽略大小写，因此用下划线区分单词，一开始就写成存储时的命名，减小理解成本
const ClientRoutes = model<IClientRoutes>('client_routes', new Schema<IClientRoutes>(
	{
		role: {
			type: Schema.Types.ObjectId,
			ref: 'roles'
		},
		routesJson: {
			type: String,
			required: true
		},
		isDelete: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{ timestamps: true }
));

export { IClientRoutes, ClientRoutes };