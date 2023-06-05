// import { getSurrealClient } from 'shared/surreal';
import { Surreal } from 'surrealdb.js';

export const dbClient = new Surreal('http://localhost:8000');

export async function signIn(user: string, pass: string): Promise<boolean> {
  const token = await dbClient.signin({
    db: 'local',
    ns: 'interview_journey',
    sc: 'roadtojobsusers',
    user,
    pass,
  });

  if (token) {
    localStorage.setItem('AUTH_JWT_TOKEN', token);
  }

  return !!token;
}
