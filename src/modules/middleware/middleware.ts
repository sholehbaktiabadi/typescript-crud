import { NextFunction, Request, Response } from 'express';
import { ResErr } from '../../utils/response';
import jwt from 'jsonwebtoken';
import env from '../../config/env';

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization) return ResErr(res, 401, 'token required');
  const [bearer, token] = authorization.split(' ');
  if (!token || !bearer) return ResErr(res, 401, 'token required');
  try {
    jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    return ResErr(res, 401, 'invalid token');
  }
}
