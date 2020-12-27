import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { ValidationError } from 'express-validation';
import AppError from './errors/app-error';
import routes from './routes';
import 'reflect-metadata';
import './database';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.use(
  // _next needs to be in scope here for the middleware to work, go ask the guy
  // that hacked async error handling into express why.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.log(err);

    if (err instanceof AppError)
      return response.status(err.statusCode).json({ message: err.message });

    if (err instanceof ValidationError) {
      // eslint-disable-next-line no-console
      console.log(err.details.body);
      return response.status(400).json({ message: 'badrequest' });
    }

    return response.status(500).json({ message: 'Internal Server Error' });
  },
);

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server started on port ${process.env.APP_PORT}`);
});
