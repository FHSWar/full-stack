import { model, Schema } from 'mongoose';
import { IRole } from '@/model/role';
import { rolesNoEmpty } from '@/model/validator';

interface IApiRestriction {
	apiRoute: string
	belongModule: string
	requestMethod: string
	description: string
	roles: IRole[] // 用Types.ObjectId[]要强转，不好。mongoose populate之后得到 Role数组，好。
    createdAt: Date
	updatedAt: Date
    isDelete: boolean
}

const ApiRestrictionSchema = new Schema<IApiRestriction>(
	{
		apiRoute: {
			type: String,
			required: true
		},
		belongModule: {
			type: String,
			required: true
		},
		requestMethod: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		roles: {
			type: [{
				type: Schema.Types.ObjectId,
				ref: 'roles'
			}],
			validate: [rolesNoEmpty, '至少有一个角色']
		},
		isDelete: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

// 资源和请求方式作为联合唯一键
ApiRestrictionSchema.index(
	{ apiRoute: 1, requestMethod: 1 },
	{ unique: true, partialFilterExpression: { isDelete: { $eq: false } } }
);

// model 第一个字符串存到数据库会忽略大小写，因此用下划线区分单词，一开始就写成存储时的命名，减小理解成本
const ApiRestriction = model<IApiRestriction>('api_restriction', ApiRestrictionSchema);

export { IApiRestriction, ApiRestriction };