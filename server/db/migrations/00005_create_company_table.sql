DEFINE TABLE company SCHEMAFULL
  PERMISSIONS
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

DEFINE FIELD created_at ON TABLE company
  TYPE datetime
  VALUE $value OR time::now();

DEFINE FIELD updated_at ON TABLE company
  TYPE datetime
  VALUE time::now();

DEFINE FIELD deleted_at ON TABLE company
  TYPE datetime;

DEFINE FIELD added_by_user_id ON TABLE company TYPE record (user);

DEFINE INDEX unq_company_name ON TABLE company COLUMNS name UNIQUE;