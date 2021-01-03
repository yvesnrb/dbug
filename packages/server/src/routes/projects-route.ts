import { Router } from 'express';
import authorizeTokenMiddleware from '../middleware/authorize-token-middleware';
import CreateProjectService from '../services/create-project-service';

const projectsRouter = Router();

projectsRouter.get('/', async (_request, response) => {
  return response.json({ message: 'listing projects...' });
});

projectsRouter.get('/:id', async (_request, response) => {
  return response.json({ message: 'finding project...' });
});

projectsRouter.post(
  '/',
  authorizeTokenMiddleware,
  async (request, response) => {
    const {
      body: { body },
      session: { id },
    } = request;
    const createProjectService = new CreateProjectService({ body, userId: id });

    const project = await createProjectService.execute();

    return response.json(project);
  },
);

projectsRouter.post('/:id/share', async (_request, response) => {
  return response.json({ message: 'sharing with project...' });
});

projectsRouter.post('/:id/select/:userid', async (_request, response) => {
  return response.json({ message: 'selecting candidate for project...' });
});

projectsRouter.delete('/:id', async (_request, response) => {
  return response.json({ message: 'removing project...' });
});

export default projectsRouter;
