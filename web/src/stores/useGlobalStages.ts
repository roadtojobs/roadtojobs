import { defineStore } from 'pinia';
import { Stage, stageRepo } from '@/repositories/stage.repo';

export const useGlobalStages = defineStore('stages', () => {
  const stages = ref<Stage[]>([]);

  const loadStages = async () => {
    if (stages.value.length) {
      return;
    }

    const remoteStages = await stageRepo.getAll();

    stages.value = { ...remoteStages };
  };

  return { stages, loadStages };
});
