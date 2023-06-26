import {
  CompanyNote,
  CompanyNoteTable,
  companyNoteTableToCompanyNote,
} from './companyNote.entity';
import { parseThing } from '../utils/surreal';

export type CompanyTable = {
  id: string;
  name: string;
  description: string;
  source: string;
  homepage: string;
  country_code: string;
  opinions?: string[];
  company_notes?: CompanyNoteTable[];
};

export type Company = {
  id: string;
  name: string;
  description: string;
  source: string;
  homepage: string;
  countryCode: string;
  opinions?: string[];
  companyNotes?: CompanyNote[];
};

export const companyTableToCompany = (record: CompanyTable): Company => {
  const companyNotes = record.company_notes?.map(
    (companyNote): CompanyNote =>
      <CompanyNote>(
        parseThing<CompanyNoteTable, CompanyNote>(
          companyNote,
          companyNoteTableToCompanyNote
        )
      )
  );

  return {
    ...record,
    countryCode: record.country_code,
    companyNotes,
    opinions: companyNotes?.map((note) => note.opinion),
  };
};
