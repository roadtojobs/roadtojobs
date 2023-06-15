import { dbClient } from '@/libraries/surreal';
import { CreateInterviewJourney } from '@/screens/InterviewJourneysList/InterviewJourneysList.methods';
import { generateId } from '@/utils/surrealThing';

type InterviewJourneyTable = {
  id: string;
  name: string;
  description: string;
  note: string | null;
  started_at: Date;
  ended_at: Date | null;
  ended_reason: Date | null;
  created_at: Date;
  updated_at: Date;
  archived_at: Date | null;
  total_journey_items?: number;
};

export type InterviewJourney = {
  id: string;
  name: string;
  description: string;
  note: string | null;
  startedAt: Date;
  endedAt: Date | null;
  endedReason: Date | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  totalJourneyItems?: number;
};

const interviewJourneyTableToInterviewJourney = (
  record: InterviewJourneyTable
): InterviewJourney => ({
  id: record.id,
  name: record.name,
  description: record.description,
  note: record.note,
  startedAt: record.started_at,
  endedAt: record.ended_at,
  endedReason: record.ended_reason,
  createdAt: record.created_at,
  updatedAt: record.updated_at,
  archivedAt: record.archived_at,
  totalJourneyItems: record.total_journey_items,
});

export const interviewJourneyRepo = {
  getTable() {
    return 'interview_journey';
  },

  getSingleThing(id: string) {
    return generateId(interviewJourneyRepo.getTable(), id);
  },

  async getAll(): Promise<InterviewJourney[]> {
    const [result] = await dbClient.query<InterviewJourneyTable[][]>(`
       SELECT
         *,
         ->items as items
       FROM ${interviewJourneyRepo.getTable()}
       ORDER BY started_at DESC, created_at DESC
    `);

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(interviewJourneyTableToInterviewJourney);
  },

  async create(inputs: CreateInterviewJourney): Promise<string | undefined> {
    const result = await dbClient.create(interviewJourneyRepo.getTable(), {
      name: inputs.name,
      note: inputs.note,
      started_at: inputs.startDate,
      description: inputs.description,
      user: inputs.user,
    });

    if (!result[0]) {
      return undefined;
    }

    return String(result[0].id);
  },

  async getById(id: string): Promise<InterviewJourney | null> {
    const thingId = interviewJourneyRepo.getSingleThing(id);

    const result = await dbClient.select<InterviewJourneyTable>(thingId);
    if (!result[0]) {
      return null;
    }

    return interviewJourneyTableToInterviewJourney(result[0]);
  },
};
