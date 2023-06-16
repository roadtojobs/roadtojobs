import { dbClient } from '@/libraries/surreal';
import {
  Stage,
  StageTable,
  stageTableToStage,
} from '@/repositories/stage.repo';
import { parseThing, parseThingId } from 'shared/utils/surreal';
import {
  Company,
  CompanyTable,
  companyTableToCompany,
} from '@/repositories/company.repo';
import { User, UserTable, userTableToUser } from '@/repositories/user.repo';
import { TABLES } from 'shared/constants/tables';

export type DynamicAttributes = {
  color: string;
  text: string;
}[];

export type InterviewJourneyCompanyTable = {
  id: string;
  reference: number;
  interview_journey: string;
  user: string;
  company: string | CompanyTable;
  stage: string | StageTable;
  description: string;
  attributes: DynamicAttributes;
  color: string;
  created_at: Date;
  updated_at: Date;
};

export type InterviewJourneyCompany = {
  id: string;
  reference: number;
  interviewJourneyId: string;
  userId: string;
  user?: User;
  companyId: string;
  company?: Company;
  stageId: string;
  stage?: Stage;
  description: string;
  color: string;
  attributes: DynamicAttributes;
  createdAt: Date;
  updatedAt: Date;
};

export const tableToEntity = (
  record: InterviewJourneyCompanyTable
): InterviewJourneyCompany => ({
  id: record.id,
  reference: record.reference,
  interviewJourneyId: record.interview_journey,
  companyId: parseThingId(record.company),
  company: parseThing<CompanyTable, Company>(
    record.company,
    companyTableToCompany
  ),
  userId: parseThingId(record.user),
  user: parseThing<UserTable, User>(record.user, userTableToUser),
  stageId: parseThingId(record.stage),
  stage: parseThing<StageTable, Stage>(record.stage, stageTableToStage),
  description: record.description,
  color: record.color,
  attributes: record.attributes,
  createdAt: record.created_at,
  updatedAt: record.updated_at,
});

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

    return result.result.map(tableToEntity);
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
