import { scheduleJob } from 'node-schedule';
import { STATUS, useLogger } from 'shared';
import { isTest, logTarget } from '@/config';
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

let logger = useLogger(logTarget);
// 每天更新文件输出的目标文件夹
if (!isTest) scheduleJob('0 0 * * *', () => { logger = useLogger(logTarget); logger.info('零点刷新'); });

export const mountGlobal = () => {
	global.logger = logger;
	global.redis = redis;
	global.useRouter = useRouter;
	global.STATUS = STATUS;
	global.toCliect = toCliect;
	global.wss = wss;
};
