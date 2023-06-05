import { Surreal } from 'surrealdb.js';

export const dbClient = new Surreal(import.meta.env.VITE_SURREAL_DB_ENDPOINT);

const LOCAL_STORAGE_KEY = 'AUTH_JWT_TOKEN';

export async function signIn(user: string, pass: string): Promise<boolean> {
  const oldKey = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (oldKey) {
    try {
      await dbClient.authenticate(oldKey);

      return true;
    } catch (e) {
      // do nothing
    }
  }

  const token = await dbClient.signin({
    DB: import.meta.env.VITE_SURREAL_DB_NAME,
    NS: import.meta.env.VITE_SURREAL_DB_NAMESPACE,
    SC: import.meta.env.VITE_SURREAL_DB_SCOPE,
    user,
    pass,
  });

  if (token) {
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  return !!token;
}
