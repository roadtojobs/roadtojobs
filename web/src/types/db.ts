export type CreateOkOutcome = {
  success: true;
  id: string;
};

export type CreateErrorOutcome = {
  success: false;
  message: string;
  formErrors?: Map<string, string>;
};

export type CreateOutcomes = CreateOkOutcome | CreateErrorOutcome;
