import { Surreal } from 'surrealdb.js';
import env from '../env';

export const db = new Surreal(env.surrealDbEndpoint);

/**
 * Full power root user
 */
export const initSurrealDbRootConnection = async (): Promise<void> => {
  await db.signin({
    user: env.surrealDbUser,
    pass: env.surrealDbPass,
  });

  await db.use(env.surrealDbNamespace, env.surrealDbName);
};

export const createSurrealUserConnection = (): Surreal => {
  return new Surreal(env.surrealDbEndpoint, {
    async prepare(connection) {
      await connection.use(env.surrealDbNamespace, env.surrealDbName);
    },
  });
};
