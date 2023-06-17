import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  InterviewJourneyCompany,
  InterviewJourneyCompanyTable,
  journeyItemTableToJourneyItem,
} from 'shared/entities/journeyItem.entity';

type CreateInterviewJourneyCompany = Omit<
  InterviewJourneyCompany,
  | 'id'
  | 'updatedAt'
  | 'createdAt'
  | 'stage'
  | 'company'
  | 'user'
  | 'reference'
  | 'attributes'
>;

export const interviewJourneyCompanyRepo = {
  getTable() {
    return TABLES.INTERVIEW_JOURNEY_COMPANY;
  },

  async getByJourney(
    interviewJourneyId: string
  ): Promise<InterviewJourneyCompany[]> {
    const [result] = await dbClient.query<InterviewJourneyCompanyTable[][]>(
      `
      SELECT *
      FROM ${interviewJourneyCompanyRepo.getTable()}
      WHERE interview_journey = $id
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
    values: Partial<InterviewJourneyCompanyTable>
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
      FROM ${TABLES.INTERVIEW_JOURNEY_COMPANY}
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
    const reference =
      await interviewJourneyCompanyRepo.getNextPersonalReferenceId(
        values.userId,
        values.interviewJourneyId
      );

    const [result] = await dbClient.create(TABLES.INTERVIEW_JOURNEY_COMPANY, {
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
