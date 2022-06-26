import { STATUS, useLogger } from 'shared';
import { logTarget } from '@/config';
import { KoaContext } from '@/util';

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

const logger = useLogger(logTarget);

export const mountGlobal = () => {
	global.logger = logger;
	global.STATUS = STATUS;
	global.toCliect = toCliect;
};
