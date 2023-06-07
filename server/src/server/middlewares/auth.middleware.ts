import { createSurrealUserConnection } from '@db';
import { NextFunction, Request, Response } from 'express';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userDb = createSurrealUserConnection();

  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  const token = req.headers.authorization;

  try {
    await userDb.authenticate(token);
  } catch (e) {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  next();
}
