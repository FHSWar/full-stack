import { get, post } from '@/utils';

// 获取角色列表
export const getRoleList = () => get('auth/roleList', {}, { useMessage: false });

// 增加角色
export const addRole = (params:any) => post('auth/addRole', params);

// 编辑角色描述
export const editRole = (params:any) => post('auth/editRole', params);

// 移除角色
export const removeRole = (params:any) => post('auth/removeRole', params);

// 获取所有用户
export const getUserList = () => get('auth/userList');

// 编辑用户角色
export const editUserRoles = (params:any) => post('auth/editUserRoles', params);

// 移除用户
export const removeUser = (params:any) => post('auth/removeUser', params);

// 更新角色对应路由
export const updateRoutes = (params:any) => post('auth/updateRoutes', params);

// 根据角色获取路由
export const getRoutesByRole = () => get('auth/routesByRole');
