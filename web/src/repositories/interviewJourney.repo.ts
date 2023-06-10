import { dbClient } from '@/libraries/surreal';
import { CreateInterviewJourney } from '@/screens/InterviewJourneysList/InterviewJourneysList.methods';

export type InterviewJourney = {
  id: string;
  name: string;
  description: string;
  note: string | null;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;
};

const interviewJourneyTableToInterviewJourney = (
  record: Record<string, unknown>
): InterviewJourney => ({
  id: String(record.id),
  name: String(record.name),
  description: String(record.description),
  note: String(record.note || '') || null,
  startedAt: new Date(String(record.started_at)),
  endedAt: record.ended_at ? new Date(String(record.ended_at)) : null,
  createdAt: new Date(String(record.created_at)),
});

export const interviewJourneyRepo = {
  getTable() {
    return 'interview_journey';
  },

  getSingleThing(id: string) {
    return interviewJourneyRepo.getTable().concat(':').concat(id);
  },

  async getAll(): Promise<InterviewJourney[]> {
    const result = await dbClient.query(`
       SELECT * FROM interview_journey
       ORDER BY started_at DESC, created_at DESC
    `);

    return ((result[0].result as Record<string, unknown>[]) || []).map(
      interviewJourneyTableToInterviewJourney
    );
  },

  async create(inputs: CreateInterviewJourney): Promise<string | undefined> {
    const result = await dbClient.create('interview_journey', {
      name: inputs.name,
      note: inputs.note,
      started_at: inputs.startDate,
      description: inputs.description,
      user: inputs.user,
    });

    if (!result[0]) {
      return undefined;
    }

    console.log(result[0]);

    return String(result[0].id);
  },

  async getById(id: string): Promise<InterviewJourney | null> {
    const thingId = interviewJourneyRepo.getSingleThing(id);

    const result = await dbClient.select(thingId);
    if (!result[0]) {
      return null;
    }

    return interviewJourneyTableToInterviewJourney(result[0]);
  },
};
