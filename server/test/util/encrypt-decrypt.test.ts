import { generateRsaKeyPair } from '@/util';
import { setHook } from '../util';

setHook();

describe('upload/avatar', () => {
	// 运行函数没异步调试了半个钟
	it('should console log something', async () => {
		await generateRsaKeyPair();
	});
});