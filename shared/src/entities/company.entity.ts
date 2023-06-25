export type CompanyTable = {
  id: string;
  name: string;
  description: string;
  source: string;
  homepage: string;
  country_code: string;
  opinions?: string[];
};

export type Company = {
  id: string;
  name: string;
  description: string;
  source: string;
  homepage: string;
  countryCode: string;
  opinions?: string[];
};

export const companyTableToCompany = (record: CompanyTable): Company => ({
  ...record,
  countryCode: record.country_code,
});
