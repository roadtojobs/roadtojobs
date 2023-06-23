DEFINE TABLE company_note SCHEMAFULL
  PERMISSIONS
    FOR delete NONE,
    FOR select, create, update WHERE $auth.id = user;

DEFINE FIELD journey_item ON TABLE company_note
  TYPE record (journey_item)
  ASSERT $value != NONE;

DEFINE FIELD company ON TABLE company_note
  TYPE record (company)
  ASSERT $value != NONE;

DEFINE FIELD user ON TABLE company_note
  TYPE record (user)
  ASSERT $value != NONE;

DEFINE FIELD stage ON TABLE company_note
  TYPE record (stage)
  ASSERT $value != NONE;

DEFINE FIELD feeling ON TABLE company_note
  TYPE string
  ASSERT $value != NONE;

DEFINE FIELD opinion ON TABLE company_note
  TYPE string
  ASSERT $value != NONE;

DEFINE FIELD opinion_note ON TABLE company_note
  TYPE string;

DEFINE FIELD note ON TABLE company_note
  TYPE string;

DEFINE FIELD created_at ON TABLE company_note
  TYPE datetime
  VALUE $value OR time::now()
  PERMISSIONS
    FOR update, delete NONE;

DEFINE FIELD updated_at ON TABLE company_note
  TYPE datetime
  VALUE time::now()
  PERMISSIONS
    FOR update, delete NONE;

DEFINE FIELD deleted_at ON TABLE company_note
  TYPE datetime
  VALUE time::now()
  PERMISSIONS
    FOR update, delete NONE;
