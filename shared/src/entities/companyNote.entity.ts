import {
  JourneyItem,
  JourneyItemTable,
  journeyItemTableToJourneyItem,
} from './journeyItem.entity';
import { Company, CompanyTable, companyTableToCompany } from './company.entity';
import { Stage, StageTable, stageTableToStage } from './stage.entity';
import { parseThing, parseThingId } from '../utils/surreal';
import { User, UserTable, userTableToUser } from './user.entity';

export type CompanyNoteTable = {
  id: string;
  journey_item: string | JourneyItemTable;
  company: string | CompanyTable;
  stage: string | StageTable;
  user: string | UserTable;
  feeling: string;
  feeling_note: string;
  opinion: string;
  opinion_note: string;
  note: string;
  created_at: Date;
  updated_at: Date;
};

export type CompanyNote = {
  id: string;
  journeyItemId: string;
  journeyItem?: JourneyItem;
  userId: string;
  user?: User;
  companyId: string;
  company?: Company;
  stageId: string;
  stage?: Stage;
  feeling: string;
  feelingNote: string;
  opinion: string;
  opinionNote: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
};

export const companyNoteTableToCompanyNote = (
  record: CompanyNoteTable
): CompanyNote => ({
  id: record.id,
  journeyItemId: parseThingId(record.journey_item),
  journeyItem: parseThing<JourneyItemTable, JourneyItem>(
    record.journey_item,
    journeyItemTableToJourneyItem
  ),
  userId: parseThingId(record.user),
  user: parseThing<UserTable, User>(record.user, userTableToUser),
  companyId: parseThingId(record.company),
  company: parseThing<CompanyTable, Company>(
    record.company,
    companyTableToCompany
  ),
  stageId: parseThingId(record.stage),
  stage: parseThing<StageTable, Stage>(record.stage, stageTableToStage),
  feeling: record.feeling,
  feelingNote: record.feeling_note,
  opinion: record.opinion,
  opinionNote: record.opinion_note,
  note: record.note,
  createdAt: record.created_at,
  updatedAt: record.updated_at,
});
