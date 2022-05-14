import Koa, { Context } from 'koa';
import Router from '@koa/router';
import WebSocket from 'ws';
import { model, Schema } from 'mongoose';
import { STATUS, useLogger } from 'shared';

export type KoaInstance = Koa<Koa.DefaultState, Koa.DefaultContext>
export type KoaRouter = Router<Koa.DefaultState, Koa.DefaultContext>
export type KoaContext = Context

export type SchemaType = typeof Schema
export type ModelType = typeof model

export type WebSocketServer = WebSocket.Server<WebSocket.WebSocket>

export type Logger = ReturnType<typeof useLogger>
export type Status = typeof STATUS