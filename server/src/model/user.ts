import { model, Schema } from 'mongoose';
import { IRole } from '@/model/role';
import { rolesNoEmpty } from '@/model/validator/role-no-empty';
import { onlyOneNotDelete } from '@/model/validator';

interface IUser {
	avatar?: string // 图片地址
	username: string
	um: string
	password: string
	roles: IRole[] // 用Types.ObjectId[]要强转，不好。mongoose populate之后得到 Role数组，好。
	createdAt: Date
	updatedAt: Date
	isDelete: boolean
}

const umRegex = /^[a-zA-Z][a-zA-Z0-9-]*[0-9]$/;

const User = model<IUser>('users', new Schema<IUser>(
	{
		avatar: String,
		username: {
			type: String,
			required: true,
			...onlyOneNotDelete
		},
		um: {
			type: String,
			required: true,
			validate: [(um: string) => umRegex.test(um), 'um格式错误'],
			...onlyOneNotDelete
		},
		password: {
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

export { IUser, User };