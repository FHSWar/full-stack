import { Context, Next } from 'koa';

/*
	auth模块除了noCheckArr中的内容，都需要校验角色权限
	白名单内的才能操作权限配置模块，白名单为空时所有人都能操作该模块
	两个必有角色：”访客“和”所有菜单“，这是不耦合业务的，耦合业务的角色及相关代码在此基础上开发
*/
export const checkPermission = () => {
	const noCheckArrTwo = ['login', 'logout', 'register'];

	return async (ctx: Context, next: Next) => {
		const { request } = ctx;
		const { header, url } = request;
		const token = header.authorization || '';

		// https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens 调接口的退出，更安全
		// checkJWTValidity
		if (url.startsWith('/api') && !noCheckArrTwo.includes(url.replace('/api/auth/', ''))) {
			const isLogout = await redis.get(token);
			if (isLogout) return toCliect(ctx, 'Token已失效', STATUS.FORBIDDEN);
		}

		await next();
	};
};