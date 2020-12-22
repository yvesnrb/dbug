import { Router } from 'express';
import sessionsRouter from './sessions-route';

const routes = Router();

routes.use('/sessions', sessionsRouter);

export default routes;
