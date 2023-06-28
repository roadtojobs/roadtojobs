import { z } from 'zod';
import dayjs from 'dayjs';

export const createInterviewJourney = z.object({
  user: z.string(),
  name: z
    .string({
      required_error: 'Journey Name is required',
    })
    .min(1, 'Journey Name is required'),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, 'Description is required'),
  startDate: z.date({
    required_error: 'A journey need to have a start date',
  }),
  note: z.string().optional(),
});

export type CreateInterviewJourney = z.infer<typeof createInterviewJourney>;

export const createBlankInterviewJourney = (): CreateInterviewJourney => ({
  user: '',
  name: '',
  description: '',
  startDate: dayjs().toDate(),
  note: '',
});
