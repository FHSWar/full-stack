import { pki } from 'node-forge';

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