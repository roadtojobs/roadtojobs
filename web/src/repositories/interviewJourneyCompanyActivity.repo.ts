import { dbClient } from '@/libraries/surreal';
import {
  Stage,
  StageTable,
  stageTableToStage,
} from 'shared/entities/stage.entity';
import { User, UserTable, userTableToUser } from 'shared/entities/user.entity';
import { ActivityType } from 'shared/constants/activityType';
import { TABLES } from 'shared/constants/tables';
import {
  parseNullableThing,
  parseNullableThingId,
  parseThing,
  parseThingId,
} from 'shared/utils/surreal';
import {
  Company,
  CompanyTable,
  companyTableToCompany,
} from 'shared/entities/company.entity';
import {
  DynamicAttributes,
  InterviewJourneyCompany,
  InterviewJourneyCompanyTable,
  journeyItemTableToJourneyItem,
} from 'shared/entities/journeyItem.entity';

type InterviewJourneyCompanyActivityTable = {
  id: string;
  type: ActivityType;
  interview_journey_company: string | InterviewJourneyCompanyTable;
  user: string | UserTable;
  stage: string | StageTable | undefined;
  company: string | CompanyTable | undefined;
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
  companyId: string | null;
  company?: Company;
  comment: string;
  attributes: DynamicAttributes;
  createdAt: Date;
  updatedAt: Date;
};

const tableToEntity = (
  record: InterviewJourneyCompanyActivityTable
): InterviewJourneyCompanyActivity => ({
  ...record,
  interviewJourneyCompanyId: parseThingId(record.interview_journey_company),
  interviewJourneyCompany: parseThing<
    InterviewJourneyCompanyTable,
    InterviewJourneyCompany
  >(record.interview_journey_company, journeyItemTableToJourneyItem),
  userId: parseThingId(record.user),
  user: parseThing<UserTable, User>(record.user, userTableToUser),
  stageId: parseNullableThingId(record.stage),
  stage: parseNullableThing<StageTable, Stage>(record.stage, stageTableToStage),
  companyId: parseNullableThingId(record.company),
  company: parseNullableThing<CompanyTable, Company>(
    record.company,
    companyTableToCompany
  ),
  createdAt: record.created_at,
  updatedAt: record.updated_at,
});

export const interviewJourneyCompanyActivityRepo = {
  getTable() {
    return TABLES.JOURNEY_ITEM_ACTIVITY;
  },

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

    return result.result.map(tableToEntity);
  },
};
