import request from 'supertest';
import { disconnect } from '@util';
import { server } from '../app';
import { dropCollections, dropDatabase, setUp } from './in-memory-db';

const baseUrl = 'http://localhost:9000';

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

describe('sends users', () => {
	it('should return users', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/userList')
			// eslint-disable-next-line max-len
			.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidW0iOiJNT0NLMDAxIiwicm9sZXMiOlsi566h55CG5ZGYIl0sInRpbWVTdGFtcCI6IjIwMjItMDYtMDdUMTQ6MzU6MzguMTM1WiIsImlhdCI6MTY1NDYxMjUzOCwiZXhwIjoxNjU1MjE3MzM4fQ.r-VoxVNw19rYjB00mXcC4fxi4WiehCBAafcbgVjILhM');
		expect(res.statusCode).toEqual(200);
		// expect(res.body).toHaveProperty('users');
	});
});

/* describe('Post Endpoints', () => {
	it('should create a new post', async () => {
		const res = await request(baseUrl)
			.post('/posts')
			.send({
				userId: 1,
				title: 'test'
			});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('post');
	});
}); */
