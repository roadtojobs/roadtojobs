export type Opinion =
  | 'will_try_again'
  | 'unmatched_offer'
  | 'avoid_list'
  | 'unprofessional'
  | 'took_too_long'
  | 'other';

export const opinionLabelMap: Record<Opinion, string> = {
  will_try_again: 'Will try again 👀',
  unmatched_offer: 'Underwhelming Offer 🥲',
  avoid_list: 'Avoid-list ❌',
  unprofessional: 'Unprofessional 😖',
  took_too_long: 'Took too long ⏰',
  other: 'Other ✍️',
};
