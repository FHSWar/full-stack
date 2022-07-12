import { model, Schema } from 'mongoose';
import { IRole } from '@/model/role';
import { rolesNoEmpty } from '@/model/validator/role-no-empty';

interface IApiPermission {
	apiRoute: string
	roles: IRole[] // 用Types.ObjectId[]要强转，不好。mongoose populate之后得到 Role数组，好。
    createdAt: Date
	updatedAt: Date
    isDelete: boolean
}

// model 第一个字符串存到数据库会忽略大小写，因此用下划线区分单词，一开始就写成存储时的命名，减小理解成本
const ApiPermission = model<IApiPermission>('client_routes', new Schema<IApiPermission>(
	{
		apiRoute: {
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

export { IApiPermission, ApiPermission };