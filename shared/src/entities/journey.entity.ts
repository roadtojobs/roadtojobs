export type JourneyTable = {
  id: string;
  name: string;
  description: string;
  note: string | null;
  started_at: Date;
  ended_at: Date | null;
  ended_reason: string | null;
  created_at: Date;
  updated_at: Date;
  archived_reason: string | null;
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
  endedReason: string | null;
  archivedReason: string | null;
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
  startedAt: new Date(record.started_at),
  endedAt: record.ended_at ? new Date(record.ended_at) : null,
  endedReason: record.ended_reason,
  archivedReason: record.archived_reason,
  createdAt: new Date(record.created_at),
  updatedAt: new Date(record.updated_at),
  archivedAt: record.archived_at ? new Date(record.archived_at) : null,
  totalJourneyItems: record.total_journey_items,
});
