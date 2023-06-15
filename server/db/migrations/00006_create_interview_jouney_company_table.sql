DEFINE TABLE interview_journey_company SCHEMAFULL
  PERMISSIONS
    FOR delete NONE
    FOR select, create, update WHERE $auth.id = user;

DEFINE FIELD reference ON TABLE interview_journey_company
  TYPE int;

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

DEFINE FIELD description ON TABLE interview_journey_company
  TYPE string;

DEFINE FIELD attributes ON TABLE interview_journey_company
  TYPE array;

DEFINE FIELD attributes.* ON TABLE interview_journey_company
  TYPE object;

DEFINE FIELD attributes.*.text ON TABLE interview_journey_company
  TYPE string;

DEFINE FIELD attributes.*.color ON TABLE interview_journey_company
  TYPE string;

DEFINE FIELD created_at ON TABLE interview_journey_company
  TYPE datetime
  VALUE $value OR time::now()
  PERMISSIONS FOR update, delete NONE;

DEFINE FIELD updated_at ON TABLE interview_journey_company
  TYPE datetime
  VALUE time::now()
  PERMISSIONS FOR update, delete NONE;

DEFINE EVENT created_activity ON interview_journey_company WHEN $event = 'CREATE' THEN (
  CREATE interview_journey_company_activity CONTENT {
    interview_journey_company: $value.id,
    user: $value.user,
    type: 'CREATED_JOURNEY_ITEM'
  }
);

DEFINE TABLE journey_items SCHEMALESS
  PERMISSIONS
    FOR delete NONE
    FOR select, create, update WHERE $auth.id = user;

DEFINE EVENT bind_relation_journey_item ON interview_journey_company WHEN $event = 'CREATE' THEN (
  RELATE ($value.interview_journey)->journey_items->($value.id) CONTENT {
    user: $value.user,
    connected_at: time::now()
  }
);
