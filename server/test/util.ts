import request from 'supertest';
import { encryptPassword } from 'shared';
import { closeMongo, useMongo } from '@/util';
import { server } from '@/../app';

const baseUrl = 'http://localhost:9000';
let token:string;

export const register = () => {
	it('should fail on register', async () => {
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

	it('should success on register', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/register')
			.send({ username: '111', umNo: 'mock111', password: encryptPassword('111') })
			.set('Accept', 'application/json');
		expect(res.statusCode).toEqual(200);
	});

	it('should fail on register repeatedly', async () => {
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
};

export const login = () => {
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

	it('should success on login', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/login')
			.send({
				username: '111',
				password: encryptPassword('111')
			});
		expect(res.statusCode).toEqual(200);

		token = res.body.token;
		global.token = res.body.token;
	});
};

export const logout = () => {
	it('should success on logout', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/logout')
			.set('Authorization', token);
		expect(res.statusCode).toEqual(200);
	});
};

export const getToken = () => {
	beforeAll(async () => {
		await useMongo();
		// 测试的时候应该所有角色都有权限，正式环境redis还是会从mongodb里面读到正确的值
		await redis.ltrim('permittedRoleArr', 1, 0);
	});

	afterAll(async () => {
		await closeMongo();
		redis.quit();
		server.close();
		wss.close();
	});
	describe('auth/register', register);
	describe('auth/login', login);
};