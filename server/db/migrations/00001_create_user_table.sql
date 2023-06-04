DEFINE TABLE user SCHEMAFULL;

DEFINE FIELD email ON TABLE user TYPE string
  ASSERT $value != NONE
  AND is::email($value);

DEFINE FIELD name ON TABLE user TYPE string
  ASSERT $value != NONE;

DEFINE FIELD job_title ON TABLE user TYPE string;
DEFINE FIELD description ON TABLE user TYPE string;
DEFINE FIELD metadata ON TABLE user TYPE object;
DEFINE FIELD locked ON TABLE user TYPE bool VALUE $value OR false;
DEFINE FIELD created_at ON TABLE user TYPE datetime VALUE $value OR time::now();
DEFINE FIELD updated_at ON TABLE user TYPE datetime VALUE time::now();
DEFINE FIELD deleted_at ON TABLE user TYPE datetime;

DEFINE INDEX unq_email ON TABLE user COLUMNS email UNIQUE;

