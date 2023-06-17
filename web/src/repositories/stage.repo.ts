import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  Stage,
  StageTable,
  stageTableToStage,
} from 'shared/entities/stage.entity';

export const stageRepo = {
  getTable() {
    return TABLES.STAGE;
  },

  async getAll(): Promise<Stage[]> {
    const [result] = await dbClient.query<StageTable[][]>(`
      SELECT *
      FROM ${TABLES.STAGE}
      ORDER BY position ASC
    `);

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(stageTableToStage);
  },
};
