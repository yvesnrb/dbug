import { Router } from 'express';

const projectsRouter = Router();

projectsRouter.get('/', async (_request, response) => {
  return response.json({ message: 'listing projects...' });
});

projectsRouter.get('/:id', async (_request, response) => {
  return response.json({ message: 'finding project...' });
});

projectsRouter.post('/', async (_request, response) => {
  return response.json({ message: 'creating project...' });
});

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
