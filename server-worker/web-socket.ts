import WebSocket from 'ws';

const initWebSocket = () => {
	const ws = new WebSocket('ws://127.0.0.1:9009');

	ws.on('message', (data) => {
		console.log(`worker received: ${data}`);
	});
	ws.on('error', (e) => {
		console.log(`worker received: ${e.toString()}`);
	});
};

// 如果没有异步处理，和 server 一起启动会报错一次
setTimeout(initWebSocket, 10000);