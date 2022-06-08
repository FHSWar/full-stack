// import { createWriteStream } from 'fs';
import morgan from 'koa-morgan';
import { KoaInstance } from '@/util';

// @ts-ignore
morgan.token('id', (req) => req.headers.authorization);

// 打请求日志，不是很有必要但是也是常用插件
export const useMorgan = (app:KoaInstance) => {
	app.use(morgan(':method :url :response-time :id'));
	/*
    .use(morgan('combined', { stream: createWriteStream(
        `${__dirname}/access.log`,
        { flags: 'a' }
    ) }))
    */
};