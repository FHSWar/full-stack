import { env } from 'process';
import { DEV, PRD, TEST } from './env';

// eslint-disable-next-line import/no-mutable-exports
let database = '';
switch (env.NODE_ENV) {
	case DEV:
		database = 'mongodb://localhost/fhswar';
		break;
	case PRD:
		database = 'mongodb://localhost/fhswar';
		break;
	case TEST:
		database = 'mongodb://localhost/fhswar';
		break;
	default:
		throw new Error('错误的环境设置');
}

export { database };

export const secret = 'shared-secret';