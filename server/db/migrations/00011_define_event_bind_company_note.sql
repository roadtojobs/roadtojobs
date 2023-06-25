DEFINE TABLE notes SCHEMALESS
  PERMISSIONS
    FOR delete NONE
    FOR select, create, update WHERE $auth.id = user;

DEFINE EVENT bind_company_company_note ON company_note WHEN $event = 'CREATE' THEN (
  RELATE ($value.company)->notes->($value.id) CONTENT {
    user: $value.user,
    connected_at: time::now()
  }
);
