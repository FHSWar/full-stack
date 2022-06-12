import { model, Schema, Types } from 'mongoose';
import { IRole, Role } from '@/model/role';

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

const rolesNoEmpty = async (arr: Types.ObjectId[]) => {
	const roleDocArr = await Role.find({ $or: arr.map((_id) => ({ _id })) });

	return roleDocArr.filter(({ isDelete }) => !isDelete).length > 0;
};

const User = model<IUser>('users', new Schema<IUser>(
	{
		avatar: String,
		username: {
			type: String,
			required: true
		},
		um: {
			type: String,
			required: true
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
			required: true,
			default: false
		}
	},
	{ timestamps: true }
));

export { IUser, User };