import { defineStore } from 'pinia';
import { Stage, stageRepo } from '@/repositories/stage.repo';
import { computed } from 'vue';

export const useGlobalStages = defineStore('stages', () => {
  const stages = ref<Stage[]>([]);

  const loadStages = async () => {
    if (stages.value.length) {
      return;
    }

    const remoteStages = await stageRepo.getAll();

    stages.value = [...remoteStages];
  };

  const comboboxStages = computed(() =>
    stages.value.map((stage) => ({
      text: stage.name,
      value: stage.id,
    }))
  );

  return { stages, loadStages, comboboxStages };
});
