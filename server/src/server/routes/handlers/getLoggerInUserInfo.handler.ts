import { Request, Response } from 'express';
import { getUserConnectionFromRequest } from '@db/pool';
import { UserTable } from 'shared/entities/user.entity';

export default async function getLoggerInUserInfoHandler(
  req: Request,
  res: Response
): Promise<void> {
  const dbClient = getUserConnectionFromRequest(req);

  const user = await dbClient.select<UserTable>('user');

  res.status(200).json({
    user: {
      ...(user[0] || null),
    },
  });
}
