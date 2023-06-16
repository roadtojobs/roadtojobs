DEFINE EVENT created_activity ON interview_journey_company WHEN $event = 'CREATE' THEN (
  CREATE interview_journey_company_activity CONTENT {
    interview_journey_company: $value.id,
    company: $value.company,
    user: $value.user,
    type: 'CREATED_JOURNEY_ITEM'
  }
);
