import { PUBLIC_KEY } from './config';

export const encryptPassword = async (password: string) => {
	// 解决直接import会导致vitest报错的问题
	const { pki } = await import('node-forge');

	try {
		const publicK = pki.publicKeyFromPem(PUBLIC_KEY);
		// 经过url编码，后端解密后需要url解码。encrypted虽然乱码，但可以直接发给后端解密。
		const encrypted = publicK.encrypt(password, 'RSA-OAEP');

		// 转成base64看着比较干净，globalThis可以让这个代码在node端运行。
		// https://developer.mozilla.org/en-US/docs/Web/API/btoa，这里说了是ascii编码
		if (globalThis.Buffer) return Buffer.from(encrypted, 'ascii').toString('base64');
		// chrome没有Buffer构造器，window.btoa不是deprecated的，这是ts的锅
		return globalThis.btoa(encrypted);
	} catch (e) {
		console.warn('密码加密出错', (e as Error).toString());
		return '';
	}
};