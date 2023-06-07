import { createSurrealUserConnection, purgeConnection } from '@db/pool';
import { NextFunction, Request, Response } from 'express';

const responseUnauthenticated = (res: Response) => {
  res.status(401).json({ error: 'Unauthenticated' });
};

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return responseUnauthenticated(res);
  }

  const token = req.headers.authorization;

  try {
    const userDb = createSurrealUserConnection(token);
    await userDb.authenticate(token);
  } catch (e) {
    purgeConnection(token);
    return responseUnauthenticated(res);
  }

  next();
}
