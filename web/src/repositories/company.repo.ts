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
};
