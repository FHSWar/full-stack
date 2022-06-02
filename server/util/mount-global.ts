import { STATUS, useLogger } from 'shared';
import { KoaContext } from '@util';
import wss from './web-socket';

// 同一返回
const toCliect = (
	ctx: KoaContext,
	content: any,
	status:typeof STATUS[keyof typeof STATUS] = STATUS.SUCCESS
) => {
	ctx.status = status;
	if (typeof content === 'string' || content === undefined) {
		ctx.body = { message: content || '默认返回' };
	} else {
		if (!content.message) content.message = '默认返回';
		ctx.body = content;
	}
};

export const mountGlobal = () => {
	global.logger = useLogger('chief', __dirname);
	global.STATUS = STATUS;
	global.toCliect = toCliect;
	global.wss = wss;
};
