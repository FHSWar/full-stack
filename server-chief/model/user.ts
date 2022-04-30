import { model } from 'mongoose';

const User = model('User', new Schema({
	username: {
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
}));
export default User;