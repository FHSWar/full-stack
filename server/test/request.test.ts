import request from 'supertest';
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

describe('sends users', () => {
	it('should return users', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/userList')
			// eslint-disable-next-line max-len
			.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidW0iOiJNT0NLMDAxIiwicm9sZXMiOlsi566h55CG5ZGYIl0sInRpbWVTdGFtcCI6IjIwMjItMDYtMDhUMTI6MzM6MjguMzQ0WiIsImlhdCI6MTY1NDY5MTYwOCwiZXhwIjoxNjU1Mjk2NDA4fQ.K3c8VjqxMjUgILBK9rogupf9_REs4uvVKqS4LTLeHcU');
		expect(res.statusCode).toEqual(200);
		// expect(res.body).toHaveProperty('users');
	});
});
