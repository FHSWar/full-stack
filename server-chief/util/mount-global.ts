import { Context } from 'koa';
import Router from '@koa/router';
import { Schema } from 'mongoose';
import { STATUS, useLogger } from 'shared';
import wss from './web-socket';

const router = new Router({
	prefix: '/api/'
});
// 同一返回
const toCliect = (
	ctx: Context,
	content: any,
	status:number = STATUS.SUCCESS
) => {
	ctx.status = status;
	if (typeof content === 'string' || content === undefined) {
		ctx.body = { msg: content || '默认返回' };
	} else {
		ctx.body = content;
	}
};

global.logger = useLogger('chief', __dirname);
global.router = router;
global.Schema = Schema;
global.STATUS = STATUS;
global.toCliect = toCliect;
global.wss = wss;
