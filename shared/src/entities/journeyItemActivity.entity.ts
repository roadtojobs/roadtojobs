import { ActivityType } from '../constants/activityType';
import {
  DynamicAttributes,
  JourneyItem,
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
import {
  CompanyNote,
  CompanyNoteTable,
  companyNoteTableToCompanyNote,
} from './companyNote.entity';

export type JourneyItemActivityTable = {
  id: string;
  type: ActivityType;
  journey_item: string | JourneyItemTable;
  user: string | UserTable;
  stage: string | StageTable | undefined;
  company: string | CompanyTable | undefined;
  company_note: string | CompanyNoteTable | undefined;
  comment: string;
  attributes: DynamicAttributes;
  created_at: Date;
  updated_at: Date;
};

export type JourneyItemActivity = {
  id: string;
  type: ActivityType;
  journeyItemId: string;
  journeyItem?: JourneyItem;
  userId: string;
  user?: User;
  stageId: string | null;
  stage?: Stage;
  companyId: string | null;
  company?: Company;
  companyNoteId: string | null;
  companyNote?: CompanyNote;
  comment: string;
  attributes: DynamicAttributes;
  createdAt: Date;
  updatedAt: Date;
};

export const journeyItemActivityTableToJourneyItem = (
  record: JourneyItemActivityTable
): JourneyItemActivity => ({
  ...record,
  journeyItemId: parseThingId(record.journey_item),
  journeyItem: parseThing<JourneyItemTable, JourneyItem>(
    record.journey_item,
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
  companyNoteId: parseNullableThingId(record.company_note),
  companyNote: parseNullableThing<CompanyNoteTable, CompanyNote>(
    record.company_note,
    companyNoteTableToCompanyNote
  ),
  createdAt: record.created_at,
  updatedAt: record.updated_at,
});
