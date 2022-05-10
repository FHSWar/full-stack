interface IUser {
	avatar?: string // 图片地址
	username: string
	um: string
	password: string
	permission?: string
}

const userSchema = new Schema<IUser>({
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
	permission: {
		type: String,
		default: 'developer'
	}
});

const User = model<IUser>('User', userSchema);
export { IUser, User };