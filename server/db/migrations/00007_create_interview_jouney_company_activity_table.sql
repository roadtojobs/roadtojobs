DEFINE TABLE journey_item_activity SCHEMAFULL
  PERMISSIONS
    FOR select, update, delete WHERE $auth.id = user;

DEFINE FIELD journey_item ON TABLE journey_item_activity
  TYPE record (journey_item)
  ASSERT $value != NONE;

DEFINE FIELD user ON TABLE journey_item_activity
  TYPE record (user)
  ASSERT $value != NONE;

DEFINE FIELD type ON TABLE journey_item_activity
  TYPE string;

DEFINE FIELD stage ON TABLE journey_item_activity
  TYPE record (stage);

DEFINE FIELD company ON TABLE journey_item_activity
  TYPE record (company);

DEFINE FIELD comment ON TABLE journey_item_activity
  TYPE string;

DEFINE FIELD attributes ON TABLE journey_item_activity
  TYPE array;

DEFINE FIELD attributes.* ON TABLE journey_item_activity
  TYPE object;

DEFINE FIELD attributes.*.text ON TABLE journey_item_activity
  TYPE string;

DEFINE FIELD attributes.*.color ON TABLE journey_item_activity
  TYPE string;

DEFINE FIELD created_at ON TABLE journey_item_activity
  TYPE datetime
  VALUE $value OR time::now()
  PERMISSIONS
    FOR update, delete NONE;

DEFINE FIELD updated_at ON TABLE journey_item_activity
  TYPE datetime
  VALUE time::now()
  PERMISSIONS
    FOR update, delete NONE;
