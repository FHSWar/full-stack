import Koa from 'koa';
import { readdirSync } from 'fs';
import { join } from 'path';

const routers = readdirSync(join(__dirname))
	.filter((filename) => filename !== __filename.split('/').at(-1))
	.map((filename) => require(join(__dirname, filename)));

export const useRouter = (app:Koa<Koa.DefaultState, Koa.DefaultContext>) => {
	routers.forEach((splitRouter) => app.use(splitRouter.default.routes()));
};