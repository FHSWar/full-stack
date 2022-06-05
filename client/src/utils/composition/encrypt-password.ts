import { pki } from 'node-forge';
import { PUBLIC_KEY } from '@/utils';

export const encryptPassword = (password: string) => {
	try {
		const publicK = pki.publicKeyFromPem(PUBLIC_KEY);
		// 经过url编码，后端解密后需要url解码。encrypted虽然乱码，但可以直接发给后端解密。
		const encrypted = publicK.encrypt(encodeURIComponent(password), 'RSA-OAEP');
		// 转成base64看着比较干净。
		const base64 = window.btoa(unescape(encodeURIComponent(encrypted)));

		return base64;
	} catch (e) {
		console.warn('密码加密出错', (e as Error).toString());
		return '';
	}
};
