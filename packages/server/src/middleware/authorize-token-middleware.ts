import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/app-error';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function (
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  const jwtKey = process.env.JWT_KEY || '';

  if (!authHeader) throw new AppError('unauthorized', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, jwtKey);

    const { sub } = decoded as TokenPayload;

    request.session = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('unauthorized', 401);
  }
}
