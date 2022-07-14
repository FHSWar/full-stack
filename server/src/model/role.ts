import { model, Schema } from 'mongoose';
// 离了谱，这里从'@/util'import不报错但会得到undefined
import { onlyOneNotDelete } from '@/model/validator';

interface IRole {
    role: string
    description: string
    createdAt: Date
	updatedAt: Date
    isDelete: boolean
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
		}
	},
	{ timestamps: true }
));

export { IRole, Role };