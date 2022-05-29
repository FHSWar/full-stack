interface IRole {
    role: string
    description: string
    createdAt: Date
	updatedAt: Date
    isDelete: boolean
}

const Role = model<IRole>('roles', new Schema<IRole>(
	{
		role: {
			type: String,
			required: true
		// 用户和角色都能逻辑删除，isDelete为true只有一个，但在这里不能写unique: true
		},
		description: {
			type: String,
			required: true
		},
		isDelete: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{ timestamps: true }
));

export { IRole, Role };