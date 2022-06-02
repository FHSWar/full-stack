import { model, Schema } from 'mongoose';

interface IRole {
    role: string
    description: string
    createdAt: Date
	updatedAt: Date
    isDelete: boolean
	isPermitted: boolean
}

const Role = model<IRole>('roles', new Schema<IRole>(
	{
		// 用户和角色都能逻辑删除，isDelete为true只有一个，在这里不能写unique: true
		role: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		isDelete: {
			type: Boolean,
			required: true,
			default: false
		},
		// 是否有权限访问权限配置模块相关接口，都为false就都有权限
		isPermitted: Boolean
	},
	{ timestamps: true }
));

export { IRole, Role };