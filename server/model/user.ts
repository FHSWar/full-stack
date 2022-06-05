import { model, Schema } from 'mongoose';
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

/**
   * @swagger
   * definitions:
   *   User:
   *     required:
   *       - um
   *       - username
   *       - password
   *       - roles
   *     properties:
   *       um:
   *         type: string
   *       username:
   *         type: string
   *       password:
   *         type: string
   *       roles:
   *         type: array
   *         items:
   *           type: string
   */
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