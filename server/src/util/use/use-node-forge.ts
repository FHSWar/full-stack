import { promisify } from 'util';
import { md, pki } from 'node-forge';
import { rsaPrivateKey } from '@/config';

// 用RSA私钥解密公钥加密过的密码
export const decryptPassword = (str: string) => {
	const { privateKeyFromPem } = pki;

	const privateK = privateKeyFromPem(rsaPrivateKey);

	// 找到这个'binary'花了一个钟，裂了
	const encrypted = Buffer.from(str, 'base64').toString('binary');
	const decrypted = privateK.decrypt(encrypted, 'RSA-OAEP');

	return decrypted;
};

export const encryptBySHA512 = (str: string) => {
	const encrypter = md.sha512.create();
	encrypter.update(str);

	return encrypter.digest().toHex();
};

// 生成RSA密钥对
export const generateRsaKeyPair = async () => {
	const { rsa, publicKeyToRSAPublicKeyPem, privateKeyToPem } = pki;
	const generateKeyPair = promisify(rsa.generateKeyPair);

	const { privateKey, publicKey } = await generateKeyPair({ bits: 2048, workers: 2 });

	console.log({
		publicKey: publicKeyToRSAPublicKeyPem(publicKey, 72).replace(/\r/g, ''),
		privateKey: privateKeyToPem(privateKey, 72).replace(/\r/g, '')
	});
};