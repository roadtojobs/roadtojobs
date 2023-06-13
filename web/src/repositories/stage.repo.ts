import { generateId } from '@/utils/surrealThing';
import { dbClient } from '@/libraries/surreal';

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

export const stageRepo = {
  getTable() {
    return 'stage';
  },

  getSingleThing(id: string) {
    return generateId(stageRepo.getTable(), id);
  },

  async getAll(): Promise<Stage[]> {
    const [result] = await dbClient.query<StageTable[][]>(`
      SELECT *
      FROM ${stageRepo.getTable()}
      ORDER BY position ASC
    `);

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(stageTableToStage);
  },
};
