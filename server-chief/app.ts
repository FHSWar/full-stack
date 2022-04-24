import Koa from 'koa';
import cors from '@koa/cors';
import { STATUS } from 'shared';
import { useRouter } from './router';
import './src/web-socket';

console.log('STATUS.SUCCESS', STATUS.SUCCESS);
const app = new Koa();
app.use(cors());
useRouter(app);

app.listen(9000);
