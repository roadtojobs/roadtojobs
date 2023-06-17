import { ActivityType } from '../constants/activityType';
import {
  DynamicAttributes,
  JourneyItemCompany,
  JourneyItemTable,
  journeyItemTableToJourneyItem,
} from './journeyItem.entity';
import { User, UserTable, userTableToUser } from './user.entity';
import { Stage, StageTable, stageTableToStage } from './stage.entity';
import { Company, CompanyTable, companyTableToCompany } from './company.entity';
import {
  parseNullableThing,
  parseNullableThingId,
  parseThing,
  parseThingId,
} from '../utils/surreal';

export type JourneyItemActivityTable = {
  id: string;
  type: ActivityType;
  interview_journey_company: string | JourneyItemTable;
  user: string | UserTable;
  stage: string | StageTable | undefined;
  company: string | CompanyTable | undefined;
  comment: string;
  attributes: DynamicAttributes;
  created_at: Date;
  updated_at: Date;
};

export type JourneyItemActivity = {
  id: string;
  type: ActivityType;
  interviewJourneyCompanyId: string;
  interviewJourneyCompany?: JourneyItemCompany;
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

export const journeyItemActivityTableToJourneyItem = (
  record: JourneyItemActivityTable
): JourneyItemActivity => ({
  ...record,
  interviewJourneyCompanyId: parseThingId(record.interview_journey_company),
  interviewJourneyCompany: parseThing<JourneyItemTable, JourneyItemCompany>(
    record.interview_journey_company,
    journeyItemTableToJourneyItem
  ),
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
