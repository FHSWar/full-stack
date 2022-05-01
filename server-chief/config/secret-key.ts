import { env } from 'process';
import { DEV, PRD, TEST } from './env';

// eslint-disable-next-line import/no-mutable-exports
let secretKey = '';
switch (env.NODE_ENV) {
	case DEV:
		secretKey = 'shared-secret';
		break;
	case PRD:
		secretKey = 'shared-secret';
		break;
	case TEST:
		secretKey = 'shared-secret';
		break;
	default:
		throw new Error('错误的环境设置');
}

export { secretKey };