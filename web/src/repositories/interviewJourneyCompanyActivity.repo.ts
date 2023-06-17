import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  JourneyItemActivity,
  JourneyItemActivityTable,
  journeyItemActivityTableToJourneyItem,
} from 'shared/entities/journeyItemActivity.entity';

export const interviewJourneyCompanyActivityRepo = {
  async getByJourneyCompany(
    journeyCompanyId: string
  ): Promise<JourneyItemActivity[]> {
    const [result] = await dbClient.query<JourneyItemActivityTable[][]>(
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
