import { dbClient } from '@/libraries/surreal';

export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
  createdAt: Date;
};

export const userRepo = {
  async getLoggedInUser(): Promise<User | undefined> {
    const rows = await dbClient.select('user');
    if (!rows[0]) {
      return;
    }

    return {
      id: rows[0].id,
      email: String(rows[0].email),
      username: String(rows[0].username),
      name: String(rows[0].name),
      createdAt: new Date(String(rows[0].created_at)),
    };
  },
};
