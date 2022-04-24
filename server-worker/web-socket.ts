import WebSocket from 'ws';

const initWebSocket = () => {
	const ws = new WebSocket('ws://127.0.0.1:8000');

	ws.on('message', (data) => {
		console.log(`received: ${data}`);
	});
	ws.on('error', (e) => {
		console.log(`received: ${e.toString()}`);
	});
};

// 如果没有异步处理，和 server-chief 一起启动会报错一次
setTimeout(initWebSocket, 1000);