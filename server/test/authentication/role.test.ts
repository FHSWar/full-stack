import request from 'supertest';
import { login, register } from 'test/util';
import { useMongo, closeMongo } from '@/util';
import { server } from '../../app';

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
describe('auth/addRole', () => {
	it('should fail on add role', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/addRole')
			.send({ role: '访客', description: '默认角色' })
			// eslint-disable-next-line max-len
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(403);
	});
});
