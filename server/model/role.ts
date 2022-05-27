interface IRole {
    role: string
    description: string
    createTime: Date
	updateTime: Date
    isDelete: boolean
}

const Role = model<IRole>('Role', new Schema<IRole>({
	role: {
		type: String,
		required: true
		// 用户和角色都能逻辑删除，isDelete为true只有一个，但在这里不能写unique: true
	},
	description: {
		type: String,
		required: true
	},
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

export { IRole, Role };