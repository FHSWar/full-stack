// import { post } from 'utils';
import { post } from 'utils';
import Axios from 'axios';

const axiosConfig = {
	baseURL: 'http://127.0.0.1:9000/api',
	timeout: 30000
};
const axios = Axios.create(axiosConfig);
axios.defaults.withCredentials = false;

type User = {
    username: string,
    password: string,
    checkPassword?: string
}

export const login = async (params: User) => {
	const res = await post('auth/login', params, { useLoading: true, useMessage: true });
	console.log('login res', res);
};

export const register = async (params: User) => {
	const res = await post('auth/register', params, { useLoading: true, useMessage: true });
	console.log('register res', res);
};
