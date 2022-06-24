import WebSocket from 'ws';
import { setHook } from 'test/util';

setHook();

describe('websocket server', () => {
	// 不done不结束，比较合理
	it('should respond as expected', (done) => {
		const initWebSocket = () => {
			setTimeout(() => {
				const ws = new WebSocket('ws://127.0.0.1:9009');

				ws.on('message', (data: string) => {
					console.log(`worker received: ${data}`);
					expect(data.includes('hello')).toBeTruthy();

					ws.send('from client, to server');
					ws.close();
					done();
				});
			}, 8000);
		};
		initWebSocket();
	}, 10000); // 设置单个测试的超时时间
});