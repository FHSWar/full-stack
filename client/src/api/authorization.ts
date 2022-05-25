import { get, post } from '@/utils';

type User = {
    username: string,
    password: string,
    checkPassword?: string
}

// 登陆
export const login = (params: User) => post('auth/login', params);

// 注册
export const register = (params: User) => post('auth/register', params);

// 获取用户信息
export const getUserInfo = () => get('auth/userInfo', {}, { useMessage: false });

// 更新用户信息
export const updateSelfInfo = (params: User) => post('auth/updateSelfInfo', params);

// 测试token
export const testToken = (params: any) => get('test', params);

// 上传头像
export const imgBaseUrl = 'http://localhost:9000';
export const uploadAvatar = (params: User) => post(
	'upload/avatar',
	params,
	{ useFormData: true }
);
