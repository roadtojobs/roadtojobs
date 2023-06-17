import { z } from 'zod';

export const createCommentActivity = z.object({
  type: z.literal('ADDED_NOTE'),
  comment: z
    .string({
      required_error: 'Comment is required',
    })
    .min(10, 'The minimum length is 10'),
  journeyItemId: z.string(),
  userId: z.string(),
});

export type CreateCommentActivity = z.infer<typeof createCommentActivity>;
