import { model, Schema } from 'mongoose';
// 离了谱，这里从'@/util'import不报错但会得到undefined
import { onlyOneNotDelete } from '@/util/model-util-config';

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
		// 用户和角色都能逻辑删除，isDelete为true只有一个
		role: {
			type: String,
			required: true,
			...onlyOneNotDelete
		},
		description: {
			type: String,
			required: true
		},
		isDelete: {
			type: Boolean,
			default: false
		},
		// 是否有权限访问权限配置模块相关接口，都为false就都有权限
		isPermitted: Boolean
	},
	{ timestamps: true }
));

export { IRole, Role };