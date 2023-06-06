import { dbClient } from '@/libraries/surreal';

export type InterviewJourney = {
  id: string;
  name: string;
  description: string;
  note: string | null;
};

export const interviewJourneyRepo = {
  async getAll() {
    const results = await dbClient.select<InterviewJourney[], string>(
      'interview_journey'
    );

    return results as InterviewJourney[];
  },
};
