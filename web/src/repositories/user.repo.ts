import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import { User, UserTable, userTableToUser } from 'shared/entities/user.entity';

export const userRepo = {
  async getLoggedInUser(): Promise<User | undefined> {
    const rows = await dbClient.select<UserTable>(TABLES.USER);
    if (!rows[0]) {
      return;
    }

    return userTableToUser(rows[0]);
  },
};
