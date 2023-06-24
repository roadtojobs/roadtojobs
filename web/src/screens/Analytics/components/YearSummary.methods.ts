type StatisticItem = {
  name: string;
  value?: string | number;
  isLoaded: boolean;
};

type StatisticKey =
  | 'totalJourneys'
  | 'totalOffers'
  | 'totalRejected'
  | 'totalFailed';

export type StatisticInfo = Record<StatisticKey, StatisticItem>;

export const getInitStatisticInfo = (): StatisticInfo => ({
  totalJourneys: {
    name: 'Total Journeys',
    value: 0,
    isLoaded: false,
  },
  totalOffers: {
    name: 'Offer Received',
    value: 0,
    isLoaded: false,
  },
  totalRejected: {
    name: 'Rejected',
    value: 0,
    isLoaded: false,
  },
  totalFailed: {
    name: 'Failed',
    value: 0,
    isLoaded: false,
  },
});
