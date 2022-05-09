import { get, post } from '@/utils';

type User = {
    username: string,
    password: string,
    checkPassword?: string
}

export const login = (params: User) => post('auth/login', params, { useLoading: true, useMessage: true });

export const register = (params: User) => post('auth/register', params, { useLoading: true, useMessage: true });

export const getUserInfo = () => get('auth/userInfo', { useMessage: true });

export const updateSelfInfo = (params: User) => post(
	'auth/updateSelfInfo',
	params,
	{ useLoading: true, useMessage: true }
);

export const testToken = (params: any) => get('test', params, { useMessage: true });

export const imgBaseUrl = 'http://localhost:9000';
export const uploadAvatar = (params: User) => post(
	'upload/avatar',
	params,
	{
		useLoading: true,
		useMessage: true,
		useFormData: true
	}
);
