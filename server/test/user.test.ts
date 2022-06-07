import { Error as MongooseError } from 'mongoose';
import { disconnect } from '@util';
import { Role } from 'model/role';
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
		await new Role({ role: '访客', description: '访客' }).save();
		const roles = await Role.find();
		const validRoleId = roles[0]._id;
		(userData as any).roles = [validRoleId];
		const validUser = new User(userData);
		const savedUser = await validUser.save();

		// Object Id should be defined when successfully saved to MongoDB.
		expect(savedUser._id).toBeDefined();
		expect(savedUser.um).toBe(userData.um);
		expect(savedUser.password).toBe(userData.password);
	});

	// It should us tell us the errors in on email field.
	it('create user without required field should failed', async () => {
		let err;
		try {
			const userWithoutRequiredField = new User({ username: 'TekLoon' });
			await userWithoutRequiredField.save();
		} catch (error) {
			err = error as MongooseError.ValidationError;
		}
		expect(err).toBeInstanceOf(MongooseError.ValidationError);
		expect(err?.errors.password).toBeDefined();
		expect(err?.errors.um).toBeDefined();
	});
});