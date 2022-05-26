import { pki } from 'node-forge';
import { rsaPrivateKey } from 'config';

// 用RSA私钥解密公钥加密过的密码
export const decryptPassword = (str: string) => {
	const { privateKeyFromPem } = pki;

	const privateK = privateKeyFromPem(rsaPrivateKey);
	const encrypted = Buffer.from(str, 'base64').toString();

	return privateK.decrypt(encrypted, 'RSA-OAEP');
};

// 生成RSA密钥对
export const generateRsaKeyPair = () => {
	const { rsa, publicKeyToRSAPublicKeyPem, privateKeyToPem } = pki;

	rsa.generateKeyPair({ bits: 2048, workers: 2 }, (err:any, keypair:any) => {
		if (err) {
			return;
		}

		// 这里就生成了字符串的公钥和密钥了，可以把生成结果保存起来
		console.log({
			publicKey: publicKeyToRSAPublicKeyPem(keypair.publicKey, 72).replace(/\r/g, ''),
			privateKey: privateKeyToPem(keypair.privateKey, 72).replace(/\r/g, '')
		});
	});
};