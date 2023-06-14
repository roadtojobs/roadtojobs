DEFINE TABLE interview_journey SCHEMAFULL
  PERMISSIONS
    FOR create, update, select WHERE user = $auth.id
    FOR delete NONE;

DEFINE FIELD user ON TABLE interview_journey TYPE record (user)
  ASSERT $value != NONE;

DEFINE FIELD name ON TABLE interview_journey
  TYPE string
  ASSERT $value != NONE;

DEFINE FIELD description ON TABLE interview_journey
  TYPE string
  ASSERT $value != NONE;

DEFINE FIELD note ON TABLE interview_journey
  TYPE string;

DEFINE FIELD started_at ON TABLE interview_journey
  TYPE datetime
  VALUE $value OR time::now();

DEFINE FIELD ended_at ON TABLE interview_journey
  TYPE datetime;

DEFINE FIELD started_reason ON TABLE interview_journey TYPE string;
DEFINE FIELD ended_reason ON TABLE interview_journey TYPE string;
DEFINE FIELD archived_reason ON TABLE interview_journey TYPE string;

DEFINE FIELD created_at ON TABLE interview_journey
  TYPE datetime
  VALUE $value OR time::now()
  PERMISSIONS FOR update, delete NONE;

DEFINE FIELD updated_at ON TABLE interview_journey
  TYPE datetime
  VALUE time::now()
  PERMISSIONS FOR update, delete NONE;

DEFINE FIELD archived_at ON TABLE interview_journey
  TYPE datetime;


