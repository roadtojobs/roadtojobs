export type JourneyTable = {
  id: string;
  name: string;
  description: string;
  note: string | null;
  started_at: Date;
  ended_at: Date | null;
  ended_reason: Date | null;
  created_at: Date;
  updated_at: Date;
  archived_at: Date | null;
  total_journey_items?: number;
};

export type Journey = {
  id: string;
  name: string;
  description: string;
  note: string | null;
  startedAt: Date;
  endedAt: Date | null;
  endedReason: Date | null;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  totalJourneyItems?: number;
};

export const interviewJourneyTableToInterviewJourney = (
  record: JourneyTable
): Journey => ({
  id: record.id,
  name: record.name,
  description: record.description,
  note: record.note,
  startedAt: record.started_at,
  endedAt: record.ended_at,
  endedReason: record.ended_reason,
  createdAt: record.created_at,
  updatedAt: record.updated_at,
  archivedAt: record.archived_at,
  totalJourneyItems: record.total_journey_items,
});
