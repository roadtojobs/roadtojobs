DEFINE EVENT created_activity ON journey_item WHEN $event = 'CREATE' THEN (
  CREATE interview_journey_company_activity CONTENT {
    journey_item: $value.id,
    company: $value.company,
    user: $value.user,
    type: 'CREATED_JOURNEY_ITEM'
  }
);
