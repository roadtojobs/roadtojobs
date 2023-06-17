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
