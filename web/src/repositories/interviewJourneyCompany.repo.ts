import { dbClient } from '@/libraries/surreal';
import { isString } from 'lodash-es';
import {
  Company,
  CompanyTable,
  companyTableToCompany,
} from '@/repositories/company.repo';

type DynamicAttributes = {
  color: string;
  text: string;
}[];

type InterviewJourneyCompanyTable = {
  id: string;
  interview_journey: string;
  user: string;
  company: string | CompanyTable;
  stage: string;
  description: string;
  attributes: DynamicAttributes;
  created_at: Date;
  updated_at: Date;
};

export type InterviewJourneyCompany = {
  id: string;
  interviewJourneyId: string;
  userId: string;
  companyId: string;
  company?: Company;
  stageId: string;
  description: string;
  attributes: DynamicAttributes;
  createdAt: Date;
  updatedAt: Date;
};

const tableToEntity = (
  record: InterviewJourneyCompanyTable
): InterviewJourneyCompany => ({
  id: record.id,
  interviewJourneyId: record.interview_journey,
  companyId: isString(record.company) ? record.company : record.company.id,
  company: isString(record.company)
    ? undefined
    : companyTableToCompany(record.company),
  userId: record.user,
  stageId: record.stage,
  description: record.description,
  attributes: record.attributes,
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
      FETCH company
    `,
      {
        id: interviewJourneyId,
      }
    );

    return result.result?.map(tableToEntity) || [];
  },
};
