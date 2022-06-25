import WebSocket from 'ws';
import { setHook } from 'test/util';

setHook();

describe('websocket server', () => {
	// 不done不结束，比较合理
	it('should respond as expected', (done) => {
		// 单测里可以不设置定时，从服务不行，好奇怪哦
		const ws = new WebSocket('ws://127.0.0.1:9009');

		ws.on('message', (data: string) => {
			console.log(`worker received: ${data}`);
			expect(data.includes('hello')).toBeTruthy();

			ws.send('from client, to server');
			ws.close();
			done();
		});
	});
});