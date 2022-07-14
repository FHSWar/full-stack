import type { KoaContext, KoaNext } from '@/util';

/*
	两个必有角色：”访客“和”所有菜单“，这是不耦合业务的，耦合业务的角色及相关代码在此基础上开发
*/
export const guardLoginState = () => {
	const noCheckArr = [
		'/api/auth/login',
		'/api/auth/logout',
		'/api/auth/register'
	];

	return async (ctx: KoaContext, next: KoaNext) => {
		const { request } = ctx;
		const { header, url } = request;
		const token = header.authorization || '';

		if (noCheckArr.includes(url)) return next();

		const isLogout = await redis.get(token);
		if (isLogout) return toCliect(ctx, 'Token已失效', STATUS.FORBIDDEN);
		await next();
	};
};