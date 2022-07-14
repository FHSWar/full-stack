import { get, post, remove, update } from '@/utils';
import type { ExtendedMenuTreeItem, UserInfo } from '@/utils';

interface Role {
	role: string
	description: string
}

export interface ApiRestriction {
	apiRoute: string
	belongModule: string
	description: string
	roles: string[] // 管理员
}

// 获取角色列表
export const getRoleList = () => get('auth/roleList');

// 增加角色
export const addRole = (params: Role) => post('auth/role', params);

// 编辑角色描述
export const editRole = (params: Role) => update('auth/role', params);

// 移除角色
export const removeRole = (params: Role) => remove('auth/role', params);

// 获取所有用户
export const getUserList = () => get('auth/userList');

// 编辑用户角色
export const editUserRoles = (params: Omit<UserInfo, 'avatar'>) => update('auth/userRoles', params);

// 移除用户
export const removeUser = (params: Omit<UserInfo, 'avatar'>) => remove('auth/user', params);

// 更新角色对应路由
export const updateRoutesByRole = (params: {
	role: string
	routes: ExtendedMenuTreeItem[]
}) => update('auth/routesByRole', params);

// 根据角色获取路由
export const getRoutesByRole = (params?: { role: string }) => get(
	'auth/routesByRole',
	params,
	{ handleError: true, useMessage: true }
);

// 获取加了限制的接口们
export const getRestrictedApiList = () => get('auth/api-restriction');

// 获取加了限制的接口们的所属模块们
export const getRestrictedApiModule = () => get('auth/api-restriction-modules');

// 对接口加上限制
export const addRestrictedApi = (params: ApiRestriction) => post('auth/api-restriction', params);

// 调整对应被限制接口的信息
export const updateRestrictedApi = (params: ApiRestriction) => update('auth/api-restriction', params);

// 移除对对应接口的限制
export const removeRestrictedApi = (params: ApiRestriction) => remove('auth/api-restriction', params);
