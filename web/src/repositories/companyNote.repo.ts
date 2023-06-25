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
  async getByJourneyItemId(
    journeyItemId: string,
    latest?: boolean,
    firstOnly?: boolean
  ): Promise<CompanyNote[]> {
    const [result] = await dbClient.query<CompanyNoteTable[][]>(
      `
      SELECT *
      FROM ${TABLES.COMPANY_NOTE}
      WHERE
        journey_item = $journeyItemId
      ${latest ? 'ORDER BY created_at DESC' : ''}
      ${firstOnly ? 'LIMIT 1' : ''}
    `,
      { journeyItemId }
    );

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(companyNoteTableToCompanyNote);
  },

  async create(values: CreateCompanyNote): Promise<CompanyNote | undefined> {
    const persistValues: Partial<CompanyNoteTable> = {
      journey_item: values.journeyItemId,
      user: values.userId,
      stage: values.stageId,
      company: values.companyId,
      note: values.note,
      feeling: values.feeling,
      feeling_note: values.feelingNote,
      opinion: values.opinion,
      opinion_note: values.opinionNote,
    };

    try {
      const [result] = await dbClient.create(
        TABLES.COMPANY_NOTE,
        persistValues
      );

      return companyNoteTableToCompanyNote(result as CompanyNoteTable);
    } catch (error) {
      return undefined;
    }
  },
};
