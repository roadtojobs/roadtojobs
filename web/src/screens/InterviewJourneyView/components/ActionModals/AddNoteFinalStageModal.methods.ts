import { RadioItem } from '@/components/RadioGroup/RadioGroup.methods';
import { z } from 'zod';
import { feelingLabelMap } from '@/constants/feeling';
import { opinionLabelMap } from '@/constants/opinion';

export const addFinalStageNote = z.object({
  note: z.string().default(''),
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
  return Object.entries(feelingLabelMap).map(([key, label]) => ({
    text: label,
    value: key,
  }));
};

export const getBadOpinionRadioItems = (): RadioItem[] => {
  return Object.entries(opinionLabelMap).map(([key, label]) => ({
    text: label,
    value: key,
  }));
};
