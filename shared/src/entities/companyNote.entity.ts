import {
  JourneyItem,
  JourneyItemTable,
  journeyItemTableToJourneyItem,
} from './journeyItem.entity';
import { Company, CompanyTable, companyTableToCompany } from './company.entity';
import { Stage, StageTable, stageTableToStage } from './stage.entity';
import { parseThing, parseThingId } from '../utils/surreal';

export type CompanyNoteTable = {
  id: string;
  journey_item: string | JourneyItemTable;
  company: string | CompanyTable;
  stage: string | StageTable;
  user: string;
  feeling: string;
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
  companyId: string;
  company?: Company;
  stageId: string;
  stage?: Stage;
  feeling: string;
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
  companyId: parseThingId(record.company),
  company: parseThing<CompanyTable, Company>(
    record.company,
    companyTableToCompany
  ),
  stageId: parseThingId(record.stage),
  stage: parseThing<StageTable, Stage>(record.journey_item, stageTableToStage),
  feeling: record.feeling,
  opinion: record.opinion,
  opinionNote: record.opinion_note,
  note: record.note,
  createdAt: record.created_at,
  updatedAt: record.updated_at,
});
