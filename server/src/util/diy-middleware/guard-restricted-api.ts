import { intersection } from 'lodash';
import { ApiRestriction } from '@/model/api-restriction';
import { verifyToken } from '@/util';
import type { KoaContext, KoaNext } from '@/util';

let restrictedApiList: {
    apiRoute: string
    requestMethod: string
    roles: string[]
}[] = [];

//! 这里可以优化，比如存一份到redis，而不是每次从硬盘读数据
const getRestrictedApiList = async () => {
	const apiList = await ApiRestriction.find({ isDelete: false }).populate('roles').lean();

	restrictedApiList = apiList.map((item) => {
		const { apiRoute, requestMethod, roles } = item;
		const roleStrArr = roles.map(({ role }) => role);

		return { apiRoute, requestMethod, roles: roleStrArr };
	});
};

// eslint-disable-next-line arrow-body-style
export const guardRestrictedApi = () => {
	return async (ctx: KoaContext, next: KoaNext) => {
		const { method, request } = ctx;
		const { header, url } = request;

		await getRestrictedApiList();

		// 如果请求接口不在被限制清单里，就通过
		if (!restrictedApiList.some(({ apiRoute }) => apiRoute === url)) return next();

		const { suc, token } = verifyToken(header.authorization?.replace('Bearer ', '') as string);
		if (suc === false) return toCliect(ctx, '无效TOKEN', STATUS.UNAUTHORIZED);

		const { roles } = token as { roles: string[] };

		const target = restrictedApiList.find((restrictedApi) => restrictedApi.requestMethod === method);

		// 如果请求接口没限制对应方法，就通过
		if (!target) return next();

		// 如果请求接口限制的对应方法的角色白名单里有用户的角色，就通过
		if (intersection(roles, target?.roles).length > 0) return next();

		// 以上都不满足，就不通过
		return toCliect(ctx, `无${method}: ${url}权限`, STATUS.UNAUTHORIZED);
	};
};