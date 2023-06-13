DEFINE TABLE stage SCHEMAFULL
  PERMISSIONS
    FOR create, delete, update NONE,
    FOR select WHERE $auth.id != NONE;

DEFINE FIELD name ON TABLE stage TYPE string ASSERT $value != NONE;
DEFINE FIELD description ON TABLE stage TYPE string ASSERT $value != NONE;
DEFINE FIELD is_initial_stage ON TABLE stage TYPE bool VALUE $value OR false;
DEFINE FIELD is_final_stage ON TABLE stage TYPE bool VALUE $value OR false;
DEFINE FIELD position ON TABLE stage TYPE int VALUE $value OR 0;
DEFINE FIELD color ON TABLE stage TYPE string VALUE $value OR 'rose';
DEFINE FIELD created_at ON TABLE stage TYPE datetime VALUE $value OR time::now();
DEFINE FIELD updated_at ON TABLE stage TYPE datetime VALUE time::now()
  PERMISSIONS NONE;

CREATE stage:interested CONTENT {
  name: 'Interested 👀',
  description: 'Interesting companies that you possibly want to apply',
  is_initial_stage: true,
  color: 'rose',
  position: 0
};

CREATE stage:applied CONTENT {
  name: 'Applied 🥹',
  description: 'Applied companies (via Email, Job Platforms,...)',
  color: 'yellow',
  position: 10
};

CREATE stage:phone_screening CONTENT {
  name: 'Phone screening ☎️',
  description: 'Before or after phone screening session (with Hiring Managers or HR)',
  color: 'indigo',
  position: 20
};

CREATE stage:interviewing CONTENT {
  name: 'Interviewing ⚔️',
  description: 'In the interview sessions. There might be several sessions.',
  color: 'blue',
  position: 30
};

CREATE stage:waiting_for_offer CONTENT {
  name: 'Waiting for offer 🔥',
  description:  'Finished the interview and you highly confident that you will receive the offer',
  color: 'pink',
  position: 40
};

CREATE stage:offered CONTENT {
  name: 'Offer received 💎',
  description: 'Received the offer but have not finalized the decision',
  color: 'violet',
  position: 50
};


CREATE stage:ghosted CONTENT {
  name: 'Ghosted/No reply 😞',
  description: 'Companies that did not response to your job application',
  is_final_stage: true,
  color: 'black',
  position: 60
};

CREATE stage:failed CONTENT {
  name: 'Failed 😭',
  description: 'Companies that you did not pass their interview sessions',
  is_final_stage: true,
  color: 'red',
  position: 70
};

CREATE stage:accepted_offer CONTENT {
  name: 'Accepted Offer ✅',
  description: 'Companies that you accepted their offers',
  is_final_stage: true,
  color: 'green',
  position: 80
};

CREATE stage:rejected_offer CONTENT {
  name: 'Rejected Offer ❌',
  description: 'Companies that you rejected their offers',
  is_final_stage: true,
  color: 'red',
  position: 90
};
