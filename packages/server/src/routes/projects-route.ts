import { Router } from 'express';
import { validate } from 'express-validation';
import authorizeTokenMiddleware from '../middleware/authorize-token-middleware';
import {
  newProjectSchema,
  projectIdSchema,
  projectQuerySchema,
} from '../schemas/project-schema';
import ArchiveProjectService from '../services/archive-project-service';
import CreateProjectService from '../services/create-project-service';
import GetProjectPageService from '../services/get-project-page-service';
import GetProjectService from '../services/get-project-service';
import SelectProjectService from '../services/select-project-service';
import ShareProjectService from '../services/share-project-service';

const projectsRouter = Router();

projectsRouter.get(
  '/',
  authorizeTokenMiddleware,
  validate({ query: projectQuerySchema }, { context: true }),
  async (request, response) => {
    const {
      query: { page, limit, isArchived, myOwn },
      session: { id },
    } = request;

    const getProjectPageService = new GetProjectPageService({
      page: Number(page),
      limit: Number(limit),
      isArchived: Boolean(isArchived),
      myOwn: Boolean(myOwn),
      userId: id,
    });

    const result = await getProjectPageService.execute();

    return response.json(result);
  },
);

projectsRouter.get(
  '/:id',
  authorizeTokenMiddleware,
  validate({ query: projectIdSchema }),
  async (request, response) => {
    const {
      params: { id },
      session: { id: userId },
    } = request;

    const getProjectService = new GetProjectService({
      projectId: id,
      userId,
    });

    const project = await getProjectService.execute();

    return response.json(project);
  },
);

projectsRouter.post(
  '/',
  authorizeTokenMiddleware,
  validate({ body: newProjectSchema }),
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

projectsRouter.post(
  '/:id/share',
  authorizeTokenMiddleware,
  validate({ params: projectIdSchema }),
  async (request, response) => {
    const {
      params: { id },
      session: { id: userId },
    } = request;

    const shareProjectService = new ShareProjectService({
      projectId: id,
      userId,
    });

    const project = await shareProjectService.execute();

    return response.json(project);
  },
);

projectsRouter.post(
  '/:id/select/:shareId',
  authorizeTokenMiddleware,
  async (request, response) => {
    const {
      params: { id, shareId },
      session: { id: userId },
    } = request;

    const selectProjectService = new SelectProjectService({
      userId,
      shareId,
      projectId: id,
    });

    const archiveProjectService = new ArchiveProjectService({
      id,
      userId,
    });

    const share = await selectProjectService.execute();
    await archiveProjectService.execute();

    return response.json(share);
  },
);

projectsRouter.delete(
  '/:id',
  authorizeTokenMiddleware,
  validate({ params: projectIdSchema }),
  async (request, response) => {
    const {
      params: { id },
      session: { id: userId },
    } = request;

    const archiveProjectService = new ArchiveProjectService({
      id,
      userId,
    });

    const project = await archiveProjectService.execute();

    return response.json(project);
  },
);

export default projectsRouter;
