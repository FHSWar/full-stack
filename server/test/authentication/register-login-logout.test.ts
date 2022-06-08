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

describe('sends users', () => {
	it('should return users', async () => {
		const res = await request(baseUrl)
			.get('/api/auth/userList')
			// eslint-disable-next-line max-len
			.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidW0iOiJNT0NLMDAxIiwicm9sZXMiOlsi566h55CG5ZGYIl0sInRpbWVTdGFtcCI6IjIwMjItMDYtMDhUMDY6MzY6MDAuOTQ4WiIsImlhdCI6MTY1NDY3MDE2MCwiZXhwIjoxNjU1Mjc0OTYwfQ.uPVHVQG09avXukMLJGVbG5ev3iar54BsDJv53N6Cm-4');
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
