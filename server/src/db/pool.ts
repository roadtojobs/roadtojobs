import { Surreal } from 'surrealdb.js';
import env from '@appEnv';
import { Request } from 'express';

const surrealPool: Record<string, Surreal> = {};

export const createSurrealUserConnection = (identifier: string): Surreal => {
  surrealPool[identifier] ??= new Surreal(env.surrealDbEndpoint, {
    async prepare(connection) {
      await connection.use({
        ns: env.surrealDbNamespace,
        db: env.surrealDbName,
      });
    },
  });

  return surrealPool[identifier];
};

export const purgeConnection = (identifier: string) => {
  delete surrealPool[identifier];
};

export const getUserConnectionFromRequest = (req: Request): Surreal => {
  const identifier = String(req.headers.authorization);
  return createSurrealUserConnection(identifier);
};
