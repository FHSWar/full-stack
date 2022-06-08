import request from 'supertest';
import { encryptPassword } from 'shared';
import { useMongo, closeMongo } from '@/util';
import { server } from '../../app';

const baseUrl = 'http://localhost:9000';
let token:string;

beforeAll(async () => {
	await useMongo();
});

afterAll(async () => {
	await closeMongo();
	redis.quit();
	server.close();
	wss.close();
});

describe('auth/register', () => {
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
});

describe('auth/login', () => {
	it('should fail from wrong password', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/login')
			.send({
				username: '111',
				password: encryptPassword('222')
			});
		expect(res.statusCode).toEqual(403);
	});

	it('should fail from user not exist', async () => {
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
	});
});

describe('auth/logout', () => {
	it('should success on logout', async () => {
		const res = await request(baseUrl)
			.post('/api/auth/logout')
			.set('Authorization', token);
		expect(res.statusCode).toEqual(200);
	});
});