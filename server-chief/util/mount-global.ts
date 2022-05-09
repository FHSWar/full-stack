import { Context } from 'koa';
import Router from '@koa/router';
import { model, Schema } from 'mongoose';
import { STATUS, useLogger } from 'shared';
import wss from './web-socket';

const router = new Router({
	prefix: '/api/'
});
// 同一返回
const toCliect = (
	ctx: Context,
	content: any,
	status:typeof STATUS[keyof typeof STATUS] = STATUS.SUCCESS

) => {
	ctx.status = status;
	if (typeof content === 'string' || content === undefined) {
		ctx.body = { message: content || '默认返回' };
	} else {
		ctx.body = content;
	}
};

export const mountGlobal = () => {
	global.logger = useLogger('chief', __dirname);
	global.model = model;
	global.router = router;
	global.Schema = Schema;
	global.STATUS = STATUS;
	global.toCliect = toCliect;
	global.wss = wss;
};
