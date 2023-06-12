DEFINE TABLE interview_journey_company SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE $auth.id = user;

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

DEFINE FIELD created_at ON TABLE interview_journey_company
  TYPE datetime
  VALUE $value OR time::now();

DEFINE FIELD updated_at ON TABLE interview_journey_company
  TYPE datetime
  VALUE time::now();
