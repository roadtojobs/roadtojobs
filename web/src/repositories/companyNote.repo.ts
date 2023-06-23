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
    journeyItemId: string
  ): Promise<CompanyNote | undefined> {
    const [result] = await dbClient.query<CompanyNoteTable[][]>(
      `
      SELECT *
      FROM ${TABLES.COMPANY_NOTE}
      WHERE journey_item = $journeyItemId
    `,
      { journeyItemId }
    );

    if (result.status === 'ERR' || !result.result[0]) {
      return;
    }

    return companyNoteTableToCompanyNote(result.result[0] as CompanyNoteTable);
  },

  async upsert(values: CreateCompanyNote): Promise<CompanyNote | undefined> {
    const oldRecord = await companyNoteRepo.getByJourneyItemId(
      values.journeyItemId
    );

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
      const [result] = oldRecord
        ? await dbClient.merge(oldRecord.id, persistValues)
        : await dbClient.create(TABLES.COMPANY_NOTE, persistValues);

      return companyNoteTableToCompanyNote(result as CompanyNoteTable);
    } catch (error) {
      return undefined;
    }
  },
};
