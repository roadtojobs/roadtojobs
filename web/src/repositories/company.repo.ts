import { dbClient } from '@/libraries/surreal';
import {
  Company,
  CompanyTable,
  companyTableToCompany,
} from 'shared/entities/company.entity';
import { TABLES } from 'shared/constants/tables';

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
