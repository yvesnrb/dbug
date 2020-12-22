import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from './errors/app-error';
import routes from './routes';
import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  // _next needs to be in scope here for the middleware to work, go ask the guy
  // that hacked async error handling into express why.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    console.log(err);

    if (err instanceof AppError)
      return response.status(err.statusCode).json({ message: err.message });

    return response.status(500).json({ message: 'Internal Server Error' });
  },
);

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server started on port ${process.env.APP_PORT}`);
});
