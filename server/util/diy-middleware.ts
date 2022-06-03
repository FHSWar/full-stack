import { Context, Next, ParameterizedContext } from 'koa';
import { intersection } from 'lodash';
import { verifyToken } from '@util';
import { Role } from 'model/role';

export const checkPermittedRole = async (ctx: ParameterizedContext) => {
	const { header } = ctx.request;
	const { roles } = verifyToken(header.authorization?.replace('Bearer ', '') as string) as { roles: string[] };
	const permittedRoleDocArr = await Role.find({ isDelete: false, isPermitted: true });
	const permittedRoleArr = permittedRoleDocArr.map((doc) => doc.role);

	// 如果没有任何角色被授权，就都有权限
	if (permittedRoleDocArr.length === 0) return true;

	// 如果有角色被授权，登陆人角色数组里有被授权的角色，就能操作
	return intersection(roles, permittedRoleArr).length > 0;
};

/*
	auth模块除了noCheckArr中的内容，都需要校验角色权限
	白名单内的才能操作权限配置模块，白名单为空时所有人都能操作该模块
	两个必有角色：”访客“和”所有菜单“，这是不耦合业务的，耦合业务的角色及相关代码在此基础上开发
*/
export const checkPermission = () => {
	const noCheckArr = ['login', 'register', 'routesByRole', 'updateSelfInfo', 'userInfo'];

	return async (ctx: Context, next: Next) => {
		const { request } = ctx;
		const { url } = request;

		if (url.startsWith('/api/auth') && !noCheckArr.includes(url.replace('/api/auth/', ''))) {
			const isPermitted = await checkPermittedRole(ctx);
			if (!isPermitted) return toCliect(ctx, '该角色无权限', STATUS.FORBIDDEN);
		}

		await next();
	};
};