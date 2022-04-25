import Router from '@koa/router';
import { Schema } from 'mongoose';
import { STATUS } from 'shared';
import wss from './web-socket';

const router = new Router();

global.router = router;
global.STATUS = STATUS;
global.wss = wss;
global.Schema = Schema;