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
			.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyLnrqHnkIblkZgiXSwidXNlcm5hbWUiOiJhZG1pbiIsInVtIjoiTU9DSzAwMSIsInRpbWVTdGFtcCI6IjIwMjItMDYtMDdUMDQ6NDM6MzguOTY3WiIsImlhdCI6MTY1NDU3NzAxOCwiZXhwIjoxNjU1MTgxODE4fQ.hUFvd2yCm_f9KjMHk57chrpRnXUrruc6lWyDt9MYjGU');
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
