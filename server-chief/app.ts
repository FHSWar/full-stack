import Koa from 'koa';
import cors from '@koa/cors';
import { STATUS } from 'shared';
import { useRouter } from './router';
import './web-socket';
import './varGlobal';






console.log('STATUS.SUCCESS', STATUS.SUCCESS);
const app = new Koa();
app.use(cors());
useRouter(app);
console.log(STATUS.FAILURE);
app.listen(9000);
