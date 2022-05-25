import { IRole } from 'model/role';

interface IUser {
	avatar?: string // 图片地址
	username: string
	um: string
	password: string
	permission: IRole[] // 用Schema.Types.ObjectId[]要强转，不好。populate之后得到 Role数组，没问题。
}

const User = model<IUser>('User', new Schema<IUser>({
	avatar: String,
	username: {
		type: String,
		required: true
	},
	um: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	permission: [{
		type: Schema.Types.ObjectId,
		ref: 'Role',
		required: true
	}]
}));

export { IUser, User };