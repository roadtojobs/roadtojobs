export type CompanyTable = {
  id: string;
  name: string;
  description: string;
  source: string;
  homepage: string;
  country_code: string;
};

export type Company = {
  id: string;
  name: string;
  description: string;
  source: string;
  homepage: string;
  countryCode: string;
};

export const companyTableToCompany = (record: CompanyTable): Company => ({
  ...record,
  countryCode: record.country_code,
});
