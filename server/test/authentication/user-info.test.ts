import request from 'supertest';
import { encryptPassword } from 'shared';
import { baseUrl, setToken } from 'test/util';

setToken();

describe('auth/userInfo', () => {
	it('should get user info', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/userInfo')
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should fail from not having authorization', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/userInfo')
			.set('Authorization', 'Bearer wrong')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(401);
	});
});

describe('auth/updateSelfInfo', () => {
	it('should fail from not requesting in pre-definded method', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/updateSelfInfo')
			.send({ um: 'MOCK111', username: '111', oldPassword: '111', password: '222' })
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(400);
	});

	it('should fail from not having right password', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/updateSelfInfo')
			.send({
				um: 'MOCK111',
				username: '111',
				oldPassword: encryptPassword('222'),
				password: encryptPassword('222')
			})
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(403);
	});

	it('should update self username', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/updateSelfInfo')
			.send({
				um: 'MOCK111',
				username: '一一一'
			})
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});

	it('should update self password', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/updateSelfInfo')
			.send({
				um: 'MOCK111',
				username: '一一一',
				oldPassword: encryptPassword('111'),
				password: encryptPassword('222')
			})
			.set('Authorization', global.token)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(200);
	});
});