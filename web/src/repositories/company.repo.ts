import { dbClient } from '@/libraries/surreal';

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
  getTable() {
    return 'company';
  },

  async getByKeyword(keyword: string): Promise<Company[]> {
    const [result] = await dbClient.query<CompanyTable[][]>(
      `
      SELECT *
      FROM company
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
