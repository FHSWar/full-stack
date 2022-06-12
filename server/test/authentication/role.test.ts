import request from 'supertest';
import { baseUrl, setToken } from 'test/util';

setToken();

describe('auth/addRole', () => {
	it('should fail to add role', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/addRole')
			.send({ role: '访客', description: '默认角色' })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(403);
	});
});
