DEFINE TABLE company SCHEMAFULL
  PERMISSIONS
    FOR select, update WHERE $auth.id != NONE,
    FOR update, delete NONE;

DEFINE FIELD name ON TABLE company
  TYPE string
  ASSERT $value != NONE;

DEFINE FIELD description ON TABLE company
  TYPE string;

DEFINE FIELD source ON TABLE company
  TYPE string;

DEFINE FIELD homepage ON TABLE company
  TYPE string;

DEFINE FIELD country_code ON TABLE company
  TYPE string;

DEFINE FIELD created_at ON TABLE company
  TYPE datetime
  VALUE $value OR time::now()
  PERMISSIONS NONE;

DEFINE FIELD updated_at ON TABLE company
  TYPE datetime
  VALUE time::now()
  PERMISSIONS NONE;

DEFINE FIELD deleted_at ON TABLE company
  TYPE datetime
  PERMISSIONS NONE;

DEFINE FIELD user_added ON TABLE company TYPE record (user);
