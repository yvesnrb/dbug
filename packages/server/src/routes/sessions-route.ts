import { Router } from 'express';
import { validate } from 'express-validation';
import AuthenticateUserService from '../services/authenticate-user-service';
import sessionSchema from '../schemas/session-schema';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  validate({ body: sessionSchema }),
  async (request, response) => {
    const { code } = request.body;
    const authenticateUserService = new AuthenticateUserService(code);
    const credentials = await authenticateUserService.execute();

    return response.json(credentials);
  },
);

export default sessionsRouter;
