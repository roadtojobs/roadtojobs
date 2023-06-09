import { z } from 'zod';
import dayjs from 'dayjs';

export const createInterviewJourney = z.object({
  name: z.string().min(1, 'Journey Name is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.date({
    required_error: 'A journey need to have a start date',
  }),
  note: z.string().nullish(),
});

export type CreateInterviewJourney = z.infer<typeof createInterviewJourney>;

export const createBlankInterviewJourney = (): CreateInterviewJourney => ({
  name: '',
  description: '',
  startDate: dayjs().toDate(),
});
