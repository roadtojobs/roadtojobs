DEFINE TABLE stage SCHEMAFULL
  PERMISSIONS
    FOR create, delete, update NONE;

DEFINE FIELD name ON TABLE stage TYPE string ASSERT $value != NONE;
DEFINE FIELD is_initial_stage ON TABLE stage TYPE bool VALUE $value OR false;
DEFINE FIELD is_final_stage ON TABLE stage TYPE bool VALUE $value OR false;
DEFINE FIELD created_at ON TABLE stage TYPE datetime VALUE $value OR time::now();
DEFINE FIELD updated_at ON TABLE stage TYPE datetime VALUE time::now()
  PERMISSIONS NONE;
