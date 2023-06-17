import { Company, CompanyTable, companyTableToCompany } from './company.entity';
import { Stage, StageTable, stageTableToStage } from './stage.entity';
import { User, UserTable, userTableToUser } from './user.entity';
import { parseThing, parseThingId } from '../utils/surreal';

export type DynamicAttributes = {
  color: string;
  text: string;
}[];

export type JourneyItemTable = {
  id: string;
  reference: number;
  journey: string;
  user: string;
  company: string | CompanyTable;
  stage: string | StageTable;
  description: string;
  attributes: DynamicAttributes;
  color: string;
  created_at: Date;
  updated_at: Date;
};

export type JourneyItemCompany = {
  id: string;
  reference: number;
  journeyId: string;
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

export const journeyItemTableToJourneyItem = (
  record: JourneyItemTable
): JourneyItemCompany => ({
  id: record.id,
  reference: record.reference,
  journeyId: record.journey,
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
