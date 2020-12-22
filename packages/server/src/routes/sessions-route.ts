import { Router } from 'express';
import AuthenticateUserService from '../services/authenticate-user-service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { code } = request.body;
  const authenticateUserService = new AuthenticateUserService(code);
  const credentials = await authenticateUserService.execute();

  return response.json(credentials);
});

export default sessionsRouter;
