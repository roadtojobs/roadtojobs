import { dbClient } from '@/libraries/surreal';

export type User = {
  email: string;
  username: string;
  name: string;
};

export const userRepo = {
  async getLoggedInUser(): Promise<User | undefined> {
    const rows = await dbClient.select<User[], string>('user');

    if (!rows[0]) {
      return;
    }

    return {
      email: rows[0].email,
      username: rows[0].username,
      name: rows[0].name,
    };
  },
};
