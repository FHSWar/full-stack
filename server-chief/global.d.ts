/* eslint-disable */
import Application from 'koa';
import Router from '@koa/router';
import { STATUS } from 'shared';
import WebSocket from 'ws';
import { Schema } from 'mongoose';

type STATUS_TYPE = typeof STATUS
type SCHEMA_TYPE = typeof Schema
type ROUTER_TYPE = Router<Application.DefaultState, Application.DefaultContext>

declare global {
    var router: ROUTER_TYPE;
    var STATUS: STATUS_TYPE;
    var wss: WebSocket.Server<WebSocket.WebSocket>
    var Schema: SCHEMA_TYPE;
}

export { }