/* eslint-disable */
import WebSocket from 'ws';
import { STATUS } from 'shared';

type STATUS_TYPE = typeof STATUS
declare global {
    var STATUS: STATUS_TYPE;
    var wss: WebSocket.Server<WebSocket.WebSocket>
}

export { }