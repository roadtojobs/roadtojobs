DEFINE TABLE interview_journey_company_activity SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE $auth.id = user;

DEFINE FIELD journey_item ON TABLE interview_journey_company_activity
  TYPE record (journey_item)
  ASSERT $value != NONE;

DEFINE FIELD user ON TABLE interview_journey_company_activity
  TYPE record (user)
  ASSERT $value != NONE;

DEFINE FIELD type ON TABLE interview_journey_company_activity
  TYPE string;

DEFINE FIELD stage ON TABLE interview_journey_company_activity
  TYPE record (stage);

DEFINE FIELD company ON TABLE interview_journey_company_activity
  TYPE record (company);


DEFINE FIELD comment ON TABLE interview_journey_company_activity
  TYPE string;

DEFINE FIELD attributes ON TABLE interview_journey_company_activity
  TYPE array;

DEFINE FIELD attributes.* ON TABLE interview_journey_company_activity
  TYPE object;

DEFINE FIELD attributes.*.text ON TABLE interview_journey_company_activity
  TYPE string;

DEFINE FIELD attributes.*.color ON TABLE interview_journey_company_activity
  TYPE string;

DEFINE FIELD created_at ON TABLE interview_journey_company_activity
  TYPE datetime
  VALUE $value OR time::now()
  PERMISSIONS
    FOR update, delete NONE;

DEFINE FIELD updated_at ON TABLE interview_journey_company_activity
  TYPE datetime
  VALUE time::now()
  PERMISSIONS
    FOR update, delete NONE;
