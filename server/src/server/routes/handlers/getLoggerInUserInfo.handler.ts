import { Request, Response } from 'express';
import { getUserConnectionFromRequest } from '@db/pool';

export default async function getLoggerInUserInfoHandler(
  req: Request,
  res: Response
): Promise<void> {
  const dbClient = getUserConnectionFromRequest(req);

  const user = await dbClient.select<unknown[], string>('user');

  res.status(200).json({
    user: {
      ...(user[0] || null),
    },
  });
}
