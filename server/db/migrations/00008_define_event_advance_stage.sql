DEFINE EVENT advance_stage ON interview_journey_company WHEN $event = 'UPDATE' AND $before.stage != $after.stage THEN (
  CREATE interview_journey_company_activity CONTENT {
    interview_journey_company: $value.id,
    user: $value.user,
    stage: $after.stage,
    type: 'ADVANCED_TO_STAGE'
  }
);
