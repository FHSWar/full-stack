import { model } from 'mongoose';

interface IUser {
	username: string
	um: string
	password: string
	permission?: string
}

const userSchema = new Schema<IUser>({
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