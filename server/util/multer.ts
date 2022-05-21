import multer from '@koa/multer';
import serve from 'koa-static';
import type { KoaInstance } from '@util';

// eslint-disable-next-line no-unused-vars
type FileFilterCb = (error: Error | null, acceptFile: boolean) => void
const fileFilter = (_:multer.MulterIncomingMessage, file:multer.File, cb:FileFilterCb) => {
	file.mimetype.startsWith('image/')
		? cb(null, true)
		: cb(new Error('错误的图片类型'), false);
};

export const staticDir = `${process.cwd()}/public/static`;
export const serveStatic = (app: KoaInstance) => {
	app.use(serve(staticDir));
};

// 经过尝试，multer的storage engine灵活性不够，不能容易的我把图片大小加到
export const upload = multer({ fileFilter }).fields([
	{
		name: 'avatar',
		maxCount: 1
	}
]);