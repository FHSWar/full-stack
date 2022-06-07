import { pki } from 'node-forge';
import { PUBLIC_KEY } from './config';

export const encryptPassword = (password: string) => {
	try {
		const publicK = pki.publicKeyFromPem(PUBLIC_KEY);
		// 经过url编码，后端解密后需要url解码。encrypted虽然乱码，但可以直接发给后端解密。
		const encrypted = publicK.encrypt(password, 'RSA-OAEP');

		// 转成base64看着比较干净，globalThis可以让这个代码在node端运行。
		return globalThis.btoa(encrypted);
	} catch (e) {
		console.warn('密码加密出错', (e as Error).toString());
		return '';
	}
};