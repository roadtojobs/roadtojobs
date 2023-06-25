import { z } from 'zod';
import { Company } from 'shared/entities';
import { ComboboxItemMode } from '@/components/Combobox/Combobox.types';
import { avoidListOpinion } from '@/constants/opinion';

/**
 * @see {CreateInterviewJourneyCompany}
 */
export const createJourneyItem = z.object({
  journeyId: z.string().min(1, 'Journey must be included'),
  userId: z.string().min(1, 'User must be included'),
  companyId: z.string({
    required_error: 'Company is required',
  }),
  stageId: z.string({
    required_error: 'Stage is required',
  }),
  description: z.string().min(1, 'Description is required'),
  color: z.string().default('rose'),
});

export type CreateJourneyItem = z.infer<typeof createJourneyItem>;

export const getMode = (company: Company): ComboboxItemMode => {
  if (company.opinions?.includes(avoidListOpinion)) {
    return 'red';
  }

  if (company.opinions?.length) {
    return 'yellow';
  }

  return 'green';
};
