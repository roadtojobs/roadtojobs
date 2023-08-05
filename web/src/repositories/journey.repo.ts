import { dbClient } from '@/libraries/surreal';
import { CreateInterviewJourney } from '@/screens/InterviewJourneysList/InterviewJourneysList.methods';
import { generateId } from '@/utils/surrealThing';
import { TABLES } from 'shared/constants/tables';
import {
  Journey,
  JourneyTable,
  interviewJourneyTableToInterviewJourney,
} from 'shared/entities/journey.entity';
import { UnknownRecord } from '@/types';

export type UpdateJourney = Omit<
  Journey,
  | 'id'
  | 'createdAt'
  | 'archivedAt'
  | 'updatedAt'
  | 'totalJourneyItems'
  | 'endedAt'
  | 'endedReason'
  | 'archivedReason'
>;

type UpdateJourneyOkResult = UpdateJourney & { id: string };

export const journeyRepo = {
  getSingleThing(id: string) {
    return generateId(TABLES.JOURNEY, id);
  },

  async getAll(filterArchived: boolean = true): Promise<Journey[]> {
    const [result] = await dbClient.query<JourneyTable[][]>(`
       SELECT
         *,
         array::len(->journey_items) as total_journey_items
       FROM ${TABLES.JOURNEY}
       ${filterArchived ? 'WHERE archived_at = NONE' : ''}
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
    const thingId = journeyRepo.getSingleThing(id);

    const result = await dbClient.select<JourneyTable>(thingId);
    if (!result[0]) {
      return null;
    }

    return interviewJourneyTableToInterviewJourney(result[0]);
  },

  async update(
    id: string,
    values: UpdateJourney
  ): Promise<UpdateJourneyOkResult | undefined> {
    try {
      const [result] = await dbClient.merge(id, {
        ...values,
        started_at: values.startedAt,
      });

      return interviewJourneyTableToInterviewJourney(result as JourneyTable);
    } catch (e) {
      return;
    }
  },

  async archive(id: string, reason: string): Promise<Journey | undefined> {
    try {
      const [result] = await dbClient.merge(id, {
        archived_reason: reason,
        archived_at: new Date(),
      });

      return interviewJourneyTableToInterviewJourney(result as JourneyTable);
    } catch (e) {
      return;
    }
  },

  async end(id: string, reason: string): Promise<Journey | undefined> {
    try {
      const [result] = await dbClient.merge(id, {
        ended_reason: reason,
        ended_at: new Date(),
      });

      return interviewJourneyTableToInterviewJourney(result as JourneyTable);
    } catch (e) {
      return;
    }
  },

  async unarchive(id: string): Promise<Journey | undefined> {
    try {
      const [result] = await dbClient.merge(id, {
        archived_reason: '',
        archived_at: null,
      });

      return interviewJourneyTableToInterviewJourney(result as JourneyTable);
    } catch (e) {
      return;
    }
  },

  async getTotalJourneys(userId: string, year?: number): Promise<number> {
    const [result] = await dbClient.query<UnknownRecord[][]>(
      `
       SELECT
         count() as total
       FROM ${TABLES.JOURNEY}
       WHERE
           user = $user
           ${year ? 'AND time::year(started_at) = type::number($year)' : ''}
       GROUP ALL
    `,
      { user: userId, year }
    );

    if (result.status === 'ERR' || !result.result[0]) {
      return 0;
    }

    return Number(result.result[0].total) || 0;
  },

  async getLatestActiveJourney(): Promise<Journey | undefined> {
    const [result] = await dbClient.query<JourneyTable[][]>(`
       SELECT *
       FROM ${TABLES.JOURNEY}
       WHERE
         (archived_at = NONE OR archived_at = NULL) AND
         (ended_at = NONE OR ended_at = NULL)
       ORDER BY created_at DESC
       LIMIT 1
    `);

    if (result.status === 'ERR' || !result.result[0]) {
      return;
    }

    return interviewJourneyTableToInterviewJourney(result.result[0]);
  },
};
