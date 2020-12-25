import { Router } from 'express';
import contactsRouter from './contacts-route';
import sessionsRouter from './sessions-route';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/contacts', contactsRouter);

export default routes;
