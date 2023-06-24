import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  Company,
  CompanyTable,
  companyTableToCompany,
} from 'shared/entities/company.entity';
import { UnknownRecord } from '@/types';

type CreateCompany = Omit<Company, 'id' | 'source'>;
type UpdateCompany = Omit<Company, 'id' | 'source'>;

export const companyRepo = {
  async getWithPagination({
    keyword,
    limit,
    page,
    orderBy = 'name',
    orderDirection = 'ASC',
  }: {
    keyword: string;
    limit: number;
    page: number;
    orderBy: 'name' | 'country_code';
    orderDirection: 'ASC' | 'DESC';
  }) {
    let whereClause = '';
    if (keyword.length) {
      whereClause = `
        WHERE
          (string::lowercase(name)) CONTAINS string::lowercase($keyword)
          OR
          (string::lowercase(country_code)) CONTAINS string::lowercase($keyword)
      `;
    }

    const parsedLimit = Number(limit) || 0;
    const parsedPage = Number(page) || 0;
    const offset = (parsedPage - 1) * parsedLimit;

    if (!['name', 'country_code'].includes(orderBy)) {
      orderBy = 'name';
    }

    if (!['ASC', 'DESC'].includes(orderDirection)) {
      orderDirection = 'ASC';
    }

    const [result] = await dbClient.query<CompanyTable[][]>(
      `
      SELECT *
      FROM ${TABLES.COMPANY}
      ${whereClause}
      ORDER BY ${orderBy} ${orderDirection}
      LIMIT ${parsedLimit} START ${offset}
    `,
      { keyword }
    );

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(companyTableToCompany);
  },

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
      const [result] = await dbClient.create<UnknownRecord>(
        TABLES.COMPANY,
        values
      );

      return companyTableToCompany(result as CompanyTable);
    } catch (e) {
      return undefined;
    }
  },

  async update(
    id: string,
    values: UpdateCompany
  ): Promise<Company | undefined> {
    try {
      const [result] = await dbClient.merge<UnknownRecord>(id, {
        ...values,
        country_code: values.countryCode,
      });

      return companyTableToCompany(result as CompanyTable);
    } catch (e) {
      return undefined;
    }
  },
};
