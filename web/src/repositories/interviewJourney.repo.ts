import { dbClient } from '@/libraries/surreal';

export type InterviewJourney = {
  id: string;
  name: string;
  description: string;
  note: string | null;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;
};

export const interviewJourneyRepo = {
  async getAll(): Promise<InterviewJourney[]> {
    const result = await dbClient.query(
      `SELECT * FROM interview_journey ORDER BY started_at DESC, created_at DESC`
    );

    return ((result[0].result as unknown[]) || []).map((record: any) => ({
      id: String(record.id),
      name: String(record.name),
      description: String(record.description),
      note: String(record.note || '') || null,
      startedAt: new Date(record.started_at),
      endedAt: record.endedAt ? new Date(record.ended_at) : null,
      createdAt: new Date(record.created_at),
    }));
  },
};
