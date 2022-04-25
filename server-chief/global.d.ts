/* eslint-disable */
import Application from 'koa';
import Router from '@koa/router';
import WebSocket from 'ws';
import { Schema } from 'mongoose';
import { STATUS, useLogger } from 'shared';

type LOGGER_TYPE = ReturnType<typeof useLogger>
type SCHEMA_TYPE = typeof Schema
type STATUS_TYPE = typeof STATUS

declare global {
    var logger: LOGGER_TYPE;
    var router: Router<Application.DefaultState, Application.DefaultContext>;
    var Schema: SCHEMA_TYPE;
    var STATUS: STATUS_TYPE;
    var wss: WebSocket.Server<WebSocket.WebSocket>
}

export { }