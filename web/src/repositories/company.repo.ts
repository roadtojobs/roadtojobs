import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';

export type CompanyTable = {
  id: string;
  name: string;
  description: string;
  source: string;
  homepage: string;
};

export type Company = {
  id: string;
  name: string;
  description: string;
  source: string;
  homepage: string;
};

export const companyTableToCompany = (record: CompanyTable): Company => ({
  ...record,
});

export const companyRepo = {
  async getByKeyword(keyword: string): Promise<Company[]> {
    const [result] = await dbClient.query<CompanyTable[][]>(
      `
      SELECT *
      FROM ${TABLES.COMPANY}
      WHERE (string::lowercase(name)) CONTAINS string::lowercase($keyword)
    `,
      { keyword }
    );

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(companyTableToCompany);
  },
};
