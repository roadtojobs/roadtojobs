import { dbClient } from '@/libraries/surreal';

export type UserTable = {
  id: string;
  email: string;
  username: string;
  name: string;
  created_at: Date;
};

export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
  createdAt: Date;
};

export const userTableToUser = (record: UserTable): User => ({
  ...record,
  createdAt: record.created_at,
});

export const userRepo = {
  async getLoggedInUser(): Promise<User | undefined> {
    const rows = await dbClient.select<UserTable>('user');
    if (!rows[0]) {
      return;
    }

    return userTableToUser(rows[0]);
  },
};
