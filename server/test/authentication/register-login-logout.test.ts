import { register, login, logout } from 'test/util';
import { useMongo, closeMongo } from '@/util';
import { server } from '../../app';

beforeAll(async () => {
	await useMongo();
});

afterAll(async () => {
	await closeMongo();
	redis.quit();
	server.close();
	wss.close();
});

describe('auth/register', register);
describe('auth/login', login);
describe('auth/logout', logout);