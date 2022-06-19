import { scheduleJob } from 'node-schedule';
import { env } from 'process';
import { STATUS, useLogger } from 'shared';
import { redis, useRouter, KoaContext } from '@/util';
import wss from './web-socket';

// 统一返回格式
const toCliect = (
	ctx: KoaContext,
	content: {
		message?: string
		[key: string]: any
	} | string,
	status: typeof STATUS[keyof typeof STATUS] = STATUS.SUCCESS
) => {
	ctx.status = status;
	if (typeof content === 'string' || content === undefined) {
		ctx.body = { message: content || '默认文案' };
	} else {
		if (!content.message) content.message = '默认文案';
		ctx.body = content;
	}
};

const initLogger = () => {
	const infoLogger = useLogger('chief', process.cwd(), 'public/static/log');
	const errorLogger = useLogger('error', process.cwd(), 'public/static/log');

	return {
		debug: (...args: string[]) => { infoLogger.debug(args); },
		error: (...args: string[]) => { errorLogger.error(args); },
		info: (...args: string[]) => { infoLogger.info(args); },
		trace: (...args: string[]) => { infoLogger.trace(args); }
	};
};
let logger = initLogger();
// 每天更新文件输出的目标文件夹
if (env.NODE_ENV !== 'test')scheduleJob('0 0 * * *', () => { logger = initLogger(); logger.info('零点刷新'); });

export const mountGlobal = () => {
	global.logger = logger;
	global.redis = redis;
	global.useRouter = useRouter;
	global.STATUS = STATUS;
	global.toCliect = toCliect;
	global.wss = wss;
};
