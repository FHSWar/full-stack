import { IRole } from 'model/role';

interface IUser {
	avatar?: string // 图片地址
	username: string
	um: string
	password: string
	roles: IRole[] // 用Schema.Types.ObjectId[]要强转，不好。populate之后得到 Role数组，没问题。
	createTime: Date
	updateTime: Date
	isDelete: boolean
}

const User = model<IUser>('User', new Schema<IUser>({
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
		ref: 'Role',
		required: true
	}],
	createTime: {
		type: Date,
		required: true,
		default: Date.now
	},
	updateTime: {
		type: Date,
		required: true,
		default: Date.now
	},
	isDelete: {
		type: Boolean,
		required: true,
		default: false
	}
}));

export { IUser, User };