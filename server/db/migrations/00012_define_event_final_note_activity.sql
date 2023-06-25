DEFINE FIELD company_note ON TABLE journey_item_activity
  TYPE record (company_note);

DEFINE EVENT final_note_activity ON company_note
  WHEN
    $event = 'CREATE'
  THEN (
    CREATE journey_item_activity CONTENT {
      journey_item: $value.journey_item,
      user: $value.user,
      company_note: $value.id,
      type: 'ADDED_FINAL_NOTE'
    }
  );
