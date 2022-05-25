import { get, post } from '@/utils';

// 获取角色列表
export const getRoleList = () => get('auth/roleList', {}, { useMessage: false });

// 增加角色
export const addRole = (params:any) => post('auth/addRole', params);

// 编辑角色描述
export const editRole = (params:any) => post('auth/editRole', params);

// 移除角色
export const removeRole = (params:any) => post('auth/removeRole', params);
