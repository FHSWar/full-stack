import { IRole } from 'model/role';

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

const User = model<IUser>('users', new Schema<IUser>(
	{
		avatar: String,
		username: {
			type: String,
			required: true
		},
		um: {
			type: String,
			unique: true
		// required: true
		},
		password: {
			type: String,
			required: true
		},
		roles: [{
			type: Schema.Types.ObjectId,
			ref: 'roles',
			required: true
		}],
		isDelete: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{ timestamps: true }
));

export { IUser, User };