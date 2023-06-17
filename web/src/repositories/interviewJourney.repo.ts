import { dbClient } from '@/libraries/surreal';
import { CreateInterviewJourney } from '@/screens/InterviewJourneysList/InterviewJourneysList.methods';
import { generateId } from '@/utils/surrealThing';
import { TABLES } from 'shared/constants/tables';
import {
  Journey,
  JourneyTable,
  interviewJourneyTableToInterviewJourney,
} from 'shared/entities/journey.entity';

export const interviewJourneyRepo = {
  getSingleThing(id: string) {
    return generateId(TABLES.JOURNEY, id);
  },

  async getAll(): Promise<Journey[]> {
    const [result] = await dbClient.query<JourneyTable[][]>(`
       SELECT
         *,
         array::len(->journey_items) as total_journey_items
       FROM ${TABLES.JOURNEY}
       ORDER BY started_at DESC, created_at DESC
    `);

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(interviewJourneyTableToInterviewJourney);
  },

  async create(inputs: CreateInterviewJourney): Promise<string | undefined> {
    const result = await dbClient.create(TABLES.JOURNEY, {
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

  async getById(id: string): Promise<Journey | null> {
    const thingId = interviewJourneyRepo.getSingleThing(id);

    const result = await dbClient.select<JourneyTable>(thingId);
    if (!result[0]) {
      return null;
    }

    return interviewJourneyTableToInterviewJourney(result[0]);
  },
};
