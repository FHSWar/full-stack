import { get, post, update } from '@/utils';
import type { UserInfo } from '@/utils';

type LoginUser = Omit<UserInfo, 'avatar'|'um'|'roles'>&{checkPassword?: string}
// checkPassword

// 登陆
export const login = (params: LoginUser) => post('auth/login', params);

// 退出
export const logout = () => post('auth/logout');

// 注册
export const register = (params: LoginUser) => post('auth/register', params);

// 获取用户信息
export const getUserInfo = () => get('auth/userInfo');

// 更新用户信息
export const updateSelfInfo = (params: LoginUser) => update('auth/selfInfo', params);

// 上传头像
export const imgBaseUrl = 'http://localhost:9000';
export const uploadAvatar = (params: LoginUser&{avatar: File[]}) => post(
	'upload/avatar',
	params,
	{ useFormData: true }
);
