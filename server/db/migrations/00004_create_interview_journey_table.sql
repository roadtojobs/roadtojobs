DEFINE TABLE inteview_journey SCHEMAFULL
  PERMISSIONS
    FOR create, update, select WHERE user_id = $auth.id
    FOR delete NONE;

DEFINE FIELD user ON TABLE inteview_journey TYPE record (user)
  ASSERT $value != NONE;

DEFINE FIELD name ON TABLE inteview_journey
  TYPE string
  ASSERT $value != NONE;

DEFINE FIELD description ON TABLE inteview_journey
  TYPE string
  ASSERT $value != NONE;

DEFINE FIELD note ON TABLE inteview_journey
  TYPE string;

DEFINE FIELD started_at ON TABLE inteview_journey
  TYPE datetime
  VALUE $value OR time::now();

DEFINE FIELD ended_at ON TABLE inteview_journey
  TYPE datetime;

DEFINE FIELD started_reason ON TABLE inteview_journey TYPE string;
DEFINE FIELD ended_reason ON TABLE inteview_journey TYPE string;
DEFINE FIELD archived_reason ON TABLE inteview_journey TYPE string;

DEFINE FIELD created_at ON TABLE inteview_journey
  TYPE datetime
  VALUE $value OR time::now();

DEFINE FIELD updated_at ON TABLE inteview_journey
  TYPE datetime
  VALUE time::now();

DEFINE FIELD archived_at ON TABLE inteview_journey
  TYPE datetime;


