DEFINE EVENT advance_stage ON journey_item WHEN $event = 'UPDATE' AND $before.stage != $after.stage THEN (
  CREATE journey_item_activity CONTENT {
    journey_item: $value.id,
    user: $value.user,
    stage: $after.stage,
    type: 'ADVANCED_TO_STAGE'
  }
);
