import { z } from 'zod';

export const updateJourney = z.object({
  name: z.string().min(1, 'Journey Name is required'),
  description: z.string().min(1, 'Description is required'),
  note: z.string().default(''),
  startedAt: z.date(),
});
