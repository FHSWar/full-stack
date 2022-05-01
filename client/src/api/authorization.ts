import { get, post } from '@/utils';

type User = {
    username: string,
    password: string,
    checkPassword?: string
}

export const login = (params: User) => post('auth/login', params, { useLoading: true, useMessage: true });

export const register = (params: User) => post('auth/register', params, { useLoading: true, useMessage: true });

export const test = (params: any) => get('test', params, { useMessage: true });
