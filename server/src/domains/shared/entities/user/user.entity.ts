import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  name: z.string(),
  jobTitle: z.string().nullable(),
  description: z.string().nullable(),
  metadata: z.record(z.unknown()),
  emailVerifiedAt: z.date().nullable(),
});

export type User = z.infer<typeof userSchema>;
