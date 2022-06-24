import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 9009 });

wss.on('connection', (ws) => {
	console.log('wss connected');
	ws.on('message', (data) => {
		console.log('server received: ', data.toString());
	});
	ws.send('hello from chief server');
});
wss.on('error', (error) => {
	console.log('wss error', error);
});

export default wss;