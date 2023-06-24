import { z } from 'zod';

export const editCompany = z.object({
  name: z
    .string({
      required_error: 'Company name is required',
    })
    .min(1, 'Company name is required'),
  homepage: z.string().default(''),
  countryCode: z
    .string()
    .min(2, 'Please use ALPHA-2 Country Code')
    .max(2, 'Please use ALPHA-2 Country Code'),
  description: z.string().default(''),
});

export type EditCompany = z.infer<typeof editCompany>;
