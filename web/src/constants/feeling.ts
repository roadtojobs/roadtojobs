export type Feeling = 'good' | 'neutral' | 'bad' | 'disappointed';

export const feelingLabelMap: Record<Feeling, string> = {
  good: 'Good 😆',
  bad: 'Neutral 😀',
  neutral: 'Bad 😞',
  disappointed: 'Disappointed 😡',
};
