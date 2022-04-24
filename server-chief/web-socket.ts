import { WebSocketServer } from 'ws';

try {
	const wss = new WebSocketServer({ port: 8000 });
	wss.on('connection', (ws) => {
		console.log('wss connected');
		ws.on('message', (data) => {
			console.log('received: %s', data);
		});
		ws.send('something from chief server');
	});
} catch (e) {
	console.log('WebSocketServer init fail: ', (e as Error).toString());
}