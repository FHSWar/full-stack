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

export const login = (params: User) => {
	axios
		.post('auth/login', params)
		.then((res) => console.log('9000', res))
		.catch((err) => {
			console.log('register err', err.response.data);
		});
};

export const register = (params: User) => {
	axios
		.post('auth/register', params)
		.then((res) => console.log('9000', res))
		.catch((err) => {
			console.log('register err', err.response.data);
		});
};
