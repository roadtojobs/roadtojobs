import { dbClient } from '@/libraries/surreal';
import { isString } from 'lodash-es';
import {
  Stage,
  StageTable,
  stageTableToStage,
} from '@/repositories/stage.repo';
import {
  DynamicAttributes,
  InterviewJourneyCompany,
  InterviewJourneyCompanyTable,
} from '@/repositories/interviewJourneyCompany.repo';
import { User, UserTable, userTableToUser } from '@/repositories/user.repo';
import { ActivityType } from 'shared/constants/activityType';

type InterviewJourneyCompanyActivityTable = {
  id: string;
  type: ActivityType;
  interview_journey_company: string | InterviewJourneyCompanyTable;
  user: string | UserTable;
  stage: string | StageTable | undefined;
  comment: string;
  attributes: DynamicAttributes;
  created_at: Date;
  updated_at: Date;
};

export type InterviewJourneyCompanyActivity = {
  id: string;
  type: ActivityType;
  interviewJourneyCompanyId: string;
  interviewJourneyCompany?: InterviewJourneyCompany;
  userId: string;
  user?: User;
  stageId: string | null;
  stage?: Stage;
  comment: string;
  attributes: DynamicAttributes;
  createdAt: Date;
  updatedAt: Date;
};

const parseStage = (
  stage: string | StageTable | undefined
): Stage | undefined => {
  if (isString(stage) || !stage) {
    return undefined;
  }

  return stageTableToStage(stage);
};

const tableToEntity = (
  record: InterviewJourneyCompanyActivityTable
): InterviewJourneyCompanyActivity => ({
  ...record,
  interviewJourneyCompanyId: isString(record.interview_journey_company)
    ? record.interview_journey_company
    : record.interview_journey_company.id,
  userId: isString(record.user) ? record.user : record.user.id,
  user: isString(record.user) ? undefined : userTableToUser(record.user),
  stageId: isString(record.stage) ? record.stage : record.stage?.id ?? null,
  stage: parseStage(record.stage),
  createdAt: record.created_at,
  updatedAt: record.updated_at,
});

export const interviewJourneyCompanyActivityRepo = {
  getTable() {
    return 'interview_journey_company_activity';
  },

  async getByJourneyCompany(
    journeyCompanyId: string
  ): Promise<InterviewJourneyCompanyActivity[]> {
    const [result] = await dbClient.query<
      InterviewJourneyCompanyActivityTable[][]
    >(
      `
      SELECT *
      FROM ${interviewJourneyCompanyActivityRepo.getTable()}
      WHERE interview_journey_company = $id
      ORDER BY created_at ASC
      FETCH stage, user
    `,
      {
        id: journeyCompanyId,
      }
    );

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(tableToEntity);
  },
};
