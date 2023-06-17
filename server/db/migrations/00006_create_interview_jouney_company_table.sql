DEFINE TABLE journey_item SCHEMAFULL
  PERMISSIONS
    FOR delete NONE
    FOR select, create, update WHERE $auth.id = user;

DEFINE FIELD reference ON TABLE journey_item
  TYPE int;

DEFINE FIELD journey ON TABLE journey_item
  TYPE record (journey)
  ASSERT $value != NONE;

DEFINE FIELD company ON TABLE journey_item
  TYPE record (company)
  ASSERT $value != NONE;

DEFINE FIELD stage ON TABLE journey_item
  TYPE record (stage)
  ASSERT $value != NONE;

DEFINE FIELD user ON TABLE journey_item
  TYPE record (user)
  ASSERT $value != NONE;

DEFINE FIELD description ON TABLE journey_item
  TYPE string;

DEFINE FIELD color ON TABLE journey_item
  TYPE string
  VALUE $value OR 'rose';

DEFINE FIELD attributes ON TABLE journey_item
  TYPE array;

DEFINE FIELD attributes.* ON TABLE journey_item
  TYPE object;

DEFINE FIELD attributes.*.text ON TABLE journey_item
  TYPE string;

DEFINE FIELD attributes.*.color ON TABLE journey_item
  TYPE string;

DEFINE FIELD created_at ON TABLE journey_item
  TYPE datetime
  VALUE $value OR time::now()
  PERMISSIONS FOR update, delete NONE;

DEFINE FIELD updated_at ON TABLE journey_item
  TYPE datetime
  VALUE time::now()
  PERMISSIONS FOR update, delete NONE;

DEFINE TABLE journey_items SCHEMALESS
  PERMISSIONS
    FOR delete NONE
    FOR select, create, update WHERE $auth.id = user;

DEFINE INDEX unq_company_journey ON TABLE journey_item COLUMNS company, journey UNIQUE;

DEFINE EVENT bind_relation_journey_item ON journey_item WHEN $event = 'CREATE' THEN (
  RELATE ($value.journey)->journey_items->($value.id) CONTENT {
    user: $value.user,
    connected_at: time::now()
  }
);
