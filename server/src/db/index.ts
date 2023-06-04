import { Surreal } from 'surrealdb.js';
import env from '../env';

export const db = new Surreal(env.surrealDbEndpoint);

export const initSurrealDbConnection = async (): Promise<void> => {
  await db.signin({
    user: env.surrealDbUser,
    pass: env.surrealDbPass,
  });

  await db.use(env.surrealDbNamespace, env.surrealDbName);
};
