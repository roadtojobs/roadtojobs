import { RadioItem } from '@/components/RadioGroup/RadioGroup.methods';

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
      text: 'Too long ⏰',
      value: 'too_long',
    },
    {
      text: 'Other ✍️',
      value: 'other',
    },
  ];
};
