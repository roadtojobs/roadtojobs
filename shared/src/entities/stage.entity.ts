export type Stage = {
  id: string;
  name: string;
  description: string;
  color: string;
  isInitialStage: boolean;
  isFinalStage: boolean;
  isArchivedStage: boolean;
  isGoodStage: boolean;
  isBadStage: boolean;
};

export type StageTable = {
  id: string;
  name: string;
  description: string;
  color: string;
  is_initial_stage: boolean;
  is_final_stage: boolean;
  is_archived_stage: boolean;
  is_good_stage: boolean;
  is_bad_stage: boolean;
};

export const stageTableToStage = (record: StageTable): Stage => ({
  ...record,
  isInitialStage: record.is_initial_stage,
  isFinalStage: record.is_final_stage,
  isArchivedStage: record.is_archived_stage,
  isGoodStage: record.is_good_stage,
  isBadStage: record.is_bad_stage,
});
