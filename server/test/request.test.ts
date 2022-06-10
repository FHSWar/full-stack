import request from 'supertest';
import { login, register } from 'test/util';
import { useMongo, closeMongo } from '@/util';
import { server } from '../app';

const baseUrl = 'http://localhost:9000';

beforeAll(async () => {
	await useMongo();
});

afterAll(async () => {
	await closeMongo();
	redis.quit();
	server.close();
	wss.close();
});

describe('register', register);
describe('login', login);
describe('sends users', () => {
	it('should return users', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/userList')
			// eslint-disable-next-line max-len
			.set('Authorization', global.token);
		expect(res.statusCode).toEqual(200);
		// expect(res.body).toHaveProperty('users');
	});
});
