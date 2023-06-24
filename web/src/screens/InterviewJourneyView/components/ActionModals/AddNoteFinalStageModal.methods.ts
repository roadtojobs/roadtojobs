import { RadioItem } from '@/components/RadioGroup/RadioGroup.methods';
import { z } from 'zod';

export const addFinalStageNote = z.object({
  note: z.string(),
  feeling: z.union([
    z.literal('good'),
    z.literal('bad'),
    z.literal('neutral'),
    z.literal('disappointed'),
  ]),
  feelingNote: z.string().default(''),
  opinion: z.string().default(''),
  opinionNote: z.string().default(''),
  userId: z.string(),
  stageId: z.string(),
  journeyItemId: z.string(),
  companyId: z.string(),
});

export type AddFinalStageNote = z.infer<typeof addFinalStageNote>;

export const getFeelingRadioItems = (): RadioItem[] => {
  return [
    {
      text: 'Good 😆',
      value: 'good',
    },
    {
      text: 'Neutral 😀',
      value: 'neutral',
    },
    {
      text: 'Bad 😞',
      value: 'bad',
    },
    {
      text: 'Disappointed 😡',
      value: 'disappointed',
    },
  ];
};

export const getBadOpinionRadioItems = (): RadioItem[] => {
  return [
    {
      text: 'Will try again 👀',
      value: 'will_try_again',
    },
    {
      text: 'Underwhelming Offer 🥲',
      value: 'unmatched-offer',
    },
    {
      text: 'Avoid-list ❌',
      value: 'avoid-list',
    },
    {
      text: 'Unprofessional 😖',
      value: 'unprofessional',
    },
    {
      text: 'Took too long ⏰',
      value: 'took_too_long',
    },
    {
      text: 'Other ✍️',
      value: 'other',
    },
  ];
};
