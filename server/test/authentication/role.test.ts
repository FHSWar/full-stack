import request from 'supertest';
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

describe('auth/addRole', () => {
	it('should fail on add role', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/addRole')
			.send({ role: '访客', description: '默认角色' })
			// eslint-disable-next-line max-len
			.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidW0iOiJNT0NLMDAxIiwicm9sZXMiOlsi566h55CG5ZGYIl0sInRpbWVTdGFtcCI6IjIwMjItMDYtMDhUMTI6MzM6MjguMzQ0WiIsImlhdCI6MTY1NDY5MTYwOCwiZXhwIjoxNjU1Mjk2NDA4fQ.K3c8VjqxMjUgILBK9rogupf9_REs4uvVKqS4LTLeHcU')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});
});
