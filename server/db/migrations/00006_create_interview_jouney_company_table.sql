DEFINE TABLE interview_journey_company SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE $auth.id = user;

DEFINE FIELD reference ON TABLE interview_journey_company
  TYPE int;

DEFINE FIELD interview_journey ON TABLE interview_journey_company
  TYPE record (interview_journey)
  ASSERT $value != NONE;

DEFINE FIELD company ON TABLE interview_journey_company
  TYPE record (company)
  ASSERT $value != NONE;

DEFINE FIELD stage ON TABLE interview_journey_company
  TYPE record (stage)
  ASSERT $value != NONE;

DEFINE FIELD user ON TABLE interview_journey_company
  TYPE record (user)
  ASSERT $value != NONE;

DEFINE FIELD description ON TABLE interview_journey_company
  TYPE string;

DEFINE FIELD attributes ON TABLE interview_journey_company
  TYPE array;

DEFINE FIELD attributes.* ON TABLE interview_journey_company
  TYPE object;

DEFINE FIELD attributes.*.text ON TABLE interview_journey_company
  TYPE string;

DEFINE FIELD attributes.*.color ON TABLE interview_journey_company
  TYPE string;

DEFINE FIELD created_at ON TABLE interview_journey_company
  TYPE datetime
  VALUE $value OR time::now()
  PERMISSIONS FOR update, delete NONE;

DEFINE FIELD updated_at ON TABLE interview_journey_company
  TYPE datetime
  VALUE time::now()
  PERMISSIONS FOR update, delete NONE;

DEFINE INDEX unq_ref_journey ON TABLE company COLUMNS reference, interview_journey UNIQUE;
