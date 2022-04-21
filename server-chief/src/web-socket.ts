import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
	console.log('wss connected');
	ws.on('message', (data) => {
		console.log('received: %s', data);
	});
	ws.send('something from chief server');
});