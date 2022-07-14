import { model, Schema } from 'mongoose';
import { IRole } from '@/model/role';
import { onlyOneNotDelete, rolesNoEmpty } from '@/model/validator';

interface IApiRestriction {
	apiRoute: string
	belongModule: string
	description: string
	roles: IRole[] // 用Types.ObjectId[]要强转，不好。mongoose populate之后得到 Role数组，好。
    createdAt: Date
	updatedAt: Date
    isDelete: boolean
}

// model 第一个字符串存到数据库会忽略大小写，因此用下划线区分单词，一开始就写成存储时的命名，减小理解成本
const ApiRestriction = model<IApiRestriction>('api_restriction', new Schema<IApiRestriction>(
	{
		apiRoute: {
			type: String,
			required: true,
			...onlyOneNotDelete
		},
		belongModule: {
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
));

export { IApiRestriction, ApiRestriction };