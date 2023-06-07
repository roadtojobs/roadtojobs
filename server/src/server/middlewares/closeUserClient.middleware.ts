import { createSurrealUserConnection, purgeConnection } from '@db/pool';
import { NextFunction, Request, Response } from 'express';

export default async function closeUserClientMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization || '';
  if (!token) {
    return;
  }

  try {
    const userDb = createSurrealUserConnection(token);
    await userDb.close();
  } catch (e) {
    console.log('Close Client Error', e);
  } finally {
    purgeConnection(token);
  }

  next();
}
