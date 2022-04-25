export const Person = new Schema({
	username: {
		type: String,
		unique: true,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	email: {
		type: String,
		unique: true,
		require: true
	}
});