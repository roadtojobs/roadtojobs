export type Stage = {
  id: string;
  name: string;
  description: string;
  color: string;
  isInitialStage: boolean;
  isFinalStage: boolean;
};

export type StageTable = {
  id: string;
  name: string;
  description: string;
  color: string;
  is_initial_stage: boolean;
  is_final_stage: boolean;
};

export const stageTableToStage = (record: StageTable): Stage => ({
  ...record,
  isInitialStage: record.is_initial_stage,
  isFinalStage: record.is_final_stage,
});
