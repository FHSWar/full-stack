import { sum } from '@util';
import { disconnect } from 'mongoose';
import { server } from '../app';

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});

// close connections after each test
afterAll(() => {
	disconnect();
	redis.quit();
	server.close();
	wss.close();
});
