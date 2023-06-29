import { Surreal } from 'surrealdb.js';
import env from '../env';

export const db = new Surreal(env.surrealDbEndpoint);

let isInitialized = false;

/**
 * Full power root user
 */
export const initSurrealDbRootConnection = async (): Promise<void> => {
  if (isInitialized) {
    return;
  }

  await db.signin({
    user: env.surrealDbUser,
    pass: env.surrealDbPass,
  });

  await db.use({
    ns: env.surrealDbNamespace,
    db: env.surrealDbName,
  });

  isInitialized = true;
};
