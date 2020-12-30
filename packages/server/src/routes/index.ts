import { Router } from 'express';
import contactsRouter from './contacts-route';
import projectsRouter from './projects-route';
import sessionsRouter from './sessions-route';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/contacts', contactsRouter);
routes.use('/projects', projectsRouter);

export default routes;
