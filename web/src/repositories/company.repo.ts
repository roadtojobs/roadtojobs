import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  Company,
  CompanyTable,
  companyTableToCompany,
} from 'shared/entities/company.entity';

type CreateCompany = Omit<Company, 'id' | 'source'>;

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

  async create(values: CreateCompany): Promise<Company | undefined> {
    try {
      const [result] = await dbClient.create<CreateCompany>(
        TABLES.COMPANY,
        values
      );

      return companyTableToCompany(result as CompanyTable);
    } catch (e) {
      return undefined;
    }
  },
};
