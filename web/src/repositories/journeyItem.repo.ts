import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  JourneyItemCompany,
  JourneyItemTable,
  journeyItemTableToJourneyItem,
} from 'shared/entities/journeyItem.entity';

type CreateInterviewJourneyCompany = Omit<
  JourneyItemCompany,
  | 'id'
  | 'updatedAt'
  | 'createdAt'
  | 'stage'
  | 'company'
  | 'user'
  | 'reference'
  | 'attributes'
>;

export const journeyItemRepo = {
  async getByJourney(
    interviewJourneyId: string
  ): Promise<JourneyItemCompany[]> {
    const [result] = await dbClient.query<JourneyItemTable[][]>(
      `
      SELECT *
      FROM ${TABLES.JOURNEY_ITEM}
      WHERE journey = $id
      FETCH company, stage
    `,
      {
        id: interviewJourneyId,
      }
    );

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(journeyItemTableToJourneyItem);
  },

  async update(
    journeyItemId: string,
    values: Partial<JourneyItemTable>
  ): Promise<boolean> {
    delete values.id;
    delete values.created_at;

    const [result] = await dbClient.merge(journeyItemId, {
      ...values,
    });

    return !!result.id;
  },

  async getNextPersonalReferenceId(
    userId: string,
    interviewJourneyId: string
  ): Promise<number> {
    const [result] = await dbClient.query<
      {
        max: number;
      }[][]
    >(
      `
      SELECT math::max(reference) as max
      FROM ${TABLES.JOURNEY_ITEM}
      WHERE user = $user AND interview_journey = $interviewJourney
    `,
      { user: userId, interviewJourney: interviewJourneyId }
    );

    if (result.status === 'ERR') {
      return -1;
    }

    return result.result[0].max + 1;
  },

  async create(
    values: CreateInterviewJourneyCompany
  ): Promise<string | undefined> {
    const reference = await journeyItemRepo.getNextPersonalReferenceId(
      values.userId,
      values.journeyId
    );

    const [result] = await dbClient.create(TABLES.JOURNEY_ITEM, {
      ...values,
      reference,
    });

    return result.id;
  },

  // TODO: note for myself
  // create() {
  //    reference: getNextReferenceId();
  // }
  // getNextReferenceId(interviewJourneyId)
};
