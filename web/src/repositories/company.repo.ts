import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  Company,
  CompanyTable,
  companyTableToCompany,
} from 'shared/entities/company.entity';

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
