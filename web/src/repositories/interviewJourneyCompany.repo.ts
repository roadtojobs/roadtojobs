import { dbClient } from '@/libraries/surreal';

type InterviewJourneyCompanyTable = {
  id: string;
  interview_journey: string;
  user: string;
  company: string;
  stage: string;
  created_at: Date;
  updated_at: Date;
};

export type InterviewJourneyCompany = {
  id: string;
  interviewJourneyId: string;
  userId: string;
  companyId: string;
  stageId: string;
  createdAt: Date;
  updatedAt: Date;
};

const tableToEntity = (
  record: InterviewJourneyCompanyTable
): InterviewJourneyCompany => ({
  id: record.id,
  interviewJourneyId: record.interview_journey,
  companyId: record.company,
  userId: record.user,
  stageId: record.stage,
  createdAt: record.created_at,
  updatedAt: record.updated_at,
});

export const interviewJourneyCompanyRepo = {
  getTable() {
    return 'interview_journey_company';
  },

  async getByJourney(
    interviewJourneyId: string
  ): Promise<InterviewJourneyCompany[]> {
    const [result] = await dbClient.query<InterviewJourneyCompanyTable[][]>(
      `
      SELECT *
      FROM ${interviewJourneyCompanyRepo.getTable()}
      WHERE interview_journey = $id
    `,
      {
        id: interviewJourneyId,
      }
    );

    return result.result?.map(tableToEntity) || [];
  },
};
