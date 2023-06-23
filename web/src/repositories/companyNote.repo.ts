import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  CompanyNote,
  CompanyNoteTable,
  companyNoteTableToCompanyNote,
} from 'shared/entities/companyNote.entity';

type CreateCompanyNote = Pick<
  CompanyNote,
  | 'journeyItemId'
  | 'userId'
  | 'stageId'
  | 'companyId'
  | 'note'
  | 'feeling'
  | 'feelingNote'
  | 'opinion'
  | 'opinionNote'
>;

export const companyNoteRepo = {
  async create(values: CreateCompanyNote): Promise<CompanyNote | undefined> {
    try {
      const [result] = await dbClient.create(TABLES.COMPANY_NOTE, {
        journey_item: values.journeyItemId,
        user: values.userId,
        stage: values.stageId,
        company: values.companyId,
        note: values.note,
        feeling: values.feeling,
        feeling_note: values.feelingNote,
        opinion: values.opinion,
        opinion_note: values.opinionNote,
      });

      return companyNoteTableToCompanyNote(result as CompanyNoteTable);
    } catch (e) {
      return undefined;
    }
  },
};
