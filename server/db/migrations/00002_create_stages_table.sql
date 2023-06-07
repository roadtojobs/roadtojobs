DEFINE TABLE stage SCHEMAFULL
  PERMISSIONS
    FOR create, delete, update NONE,
    FOR select WHERE $auth.id != NONE;

DEFINE FIELD name ON TABLE stage TYPE string ASSERT $value != NONE;
DEFINE FIELD is_initial_stage ON TABLE stage TYPE bool VALUE $value OR false;
DEFINE FIELD is_final_stage ON TABLE stage TYPE bool VALUE $value OR false;
DEFINE FIELD created_at ON TABLE stage TYPE datetime VALUE $value OR time::now();
DEFINE FIELD updated_at ON TABLE stage TYPE datetime VALUE time::now()
  PERMISSIONS NONE;

CREATE stage:inresting CONTENT {
  name: 'Interesting Companies',
  is_initial_stage: true
};

CREATE stage:applied SET name = 'Applied';
CREATE stage:ghosted SET name = 'Ghosted/No reply', is_final_stage = true;
CREATE stage:interviewing SET name = 'Interviewing';
CREATE stage:waiting_for_offer SET name = 'Waiting for Offer';
CREATE stage:offered SET name = 'Offered';
CREATE stage:accepted SET name = 'Accepted Offer', is_final_stage = true;
