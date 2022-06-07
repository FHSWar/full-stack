import { Error as MongooseError } from 'mongoose';
import { disconnect } from '@util';
import { User } from 'model/user';
import { setUp, dropCollections, dropDatabase } from './in-memory-db';
import { server } from '../app';

const userData = {
	username: '555',
	um: 'MOCK555',
	password: '555'
};

beforeAll(async () => {
	await setUp();
});

afterEach(async () => {
	await dropCollections();
});

afterAll(async () => {
	await dropDatabase();
	disconnect();
	redis.quit();
	server.close();
	wss.close();
});

/**
 * User model
 */
describe('User model', () => {
	it('create & save user successfully', async () => {
		const validUser = new User(userData);
		const savedUser = await validUser.save();

		// Object Id should be defined when successfully saved to MongoDB.
		expect(savedUser._id).toBeDefined();
		expect(savedUser.um).toBe(userData.um);
		expect(savedUser.password).toBe(userData.password);
	});

	// It should us tell us the errors in on email field.
	it('create user without required field should failed', async () => {
		const userWithoutRequiredField = new User({ username: 'TekLoon' });
		let err;
		try {
			await userWithoutRequiredField.save();
		} catch (error) {
			err = error;
		}
		expect(err).toBeInstanceOf(MongooseError.ValidationError);
	});
});