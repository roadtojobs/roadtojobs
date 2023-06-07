import { dbClient } from '@/libraries/surreal';

export type InterviewJourney = {
  id: string;
  name: string;
  description: string;
  note: string | null;
  startedAt: Date;
  endedAt: Date | null;
};

export const interviewJourneyRepo = {
  async getAll() {
    const result = await dbClient.query(`SELECT * FROM interview_journey`);

    console.log(result[0].result);

    return result[0].result as InterviewJourney[];
  },
};
