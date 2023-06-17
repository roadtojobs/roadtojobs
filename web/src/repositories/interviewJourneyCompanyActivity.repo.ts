import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  InterviewJourneyCompanyActivity,
  InterviewJourneyCompanyActivityTable,
  journeyItemActivityTableToJourneyItem,
} from 'shared/entities/journeyItemActivity.entity';

export const interviewJourneyCompanyActivityRepo = {
  async getByJourneyCompany(
    journeyCompanyId: string
  ): Promise<InterviewJourneyCompanyActivity[]> {
    const [result] = await dbClient.query<
      InterviewJourneyCompanyActivityTable[][]
    >(
      `
      SELECT *
      FROM ${TABLES.JOURNEY_ITEM_ACTIVITY}
      WHERE interview_journey_company = $id
      ORDER BY created_at ASC
      FETCH stage, user, company
    `,
      {
        id: journeyCompanyId,
      }
    );

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(journeyItemActivityTableToJourneyItem);
  },
};
