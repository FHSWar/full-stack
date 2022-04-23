import WebSocket from 'ws';

try{
	const ws = new WebSocket('ws://127.0.0.1:8080');

	ws.on('message', (data) => {
		console.log('received: %s', data);
	});
}catch(e){
	console.log('server-worker web-socket error: ', (e as Error).toString())
}