import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 });
wss.on('connection', (ws) => {
	console.log('wss connected');
	ws.on('message', (data) => {
		console.log('received: %s', data);
	});
	ws.send('something from chief server');
});
wss.on('error', (error) => {
	console.log(error);
});

export default wss;