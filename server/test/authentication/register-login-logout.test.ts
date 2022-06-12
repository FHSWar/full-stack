import request from 'supertest';
import { encryptPassword } from 'shared';
import { baseUrl, login, logout, register, setHook } from 'test/util';

setHook();

describe('auth/register', () => {
	it('should fail to register', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/register')
			.send({ name: 'john' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/);
		expect(res.statusCode).toEqual(400);
	});

	it('should fail on decrypting password', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/register')
			.send({ username: '111', umNo: 'mock111', password: '111' })
			.set('Accept', 'application/json');
		expect(res.statusCode).toEqual(400);
		expect(res.body.message).toEqual('Error: Encrypted message length is invalid.');
	});

	it('should success to register', async () => {
		const res = await register();
		expect(res.statusCode).toEqual(200);
	});

	it('should fail to register repeatedly', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/register')
			.send({ username: '111', umNo: 'mock1111', password: encryptPassword('110') })
			.set('Accept', 'application/json');
		expect(res.statusCode).toEqual(403);
	});

	it('should fail on wrong um format', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/register')
			.send({ username: '222', umNo: '222', password: encryptPassword('222') })
			.set('Accept', 'application/json');
		expect(res.statusCode).toEqual(400);
	});
});

describe('auth/login', () => {
	it('should fail from encountering wrong password', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/login')
			.send({
				username: '111',
				password: encryptPassword('222')
			});
		expect(res.statusCode).toEqual(403);
	});

	it('should fail from encountering user not exist', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/login')
			.send({
				username: '222',
				password: encryptPassword('222')
			});
		expect(res.statusCode).toEqual(400);
	});

	it('should success to login', async () => {
		const res = await login();
		expect(res.statusCode).toEqual(200);
	});
});

describe('auth/logout', () => {
	it('should success to logout', async () => {
		const res = await logout();
		expect(res.statusCode).toEqual(200);
	});
});