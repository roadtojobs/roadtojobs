DEFINE EVENT advance_stage ON journey_item WHEN $event = 'UPDATE' AND $before.stage != $after.stage THEN (
  CREATE interview_journey_company_activity CONTENT {
    journey_item: $value.id,
    user: $value.user,
    stage: $after.stage,
    type: 'ADVANCED_TO_STAGE'
  }
);
