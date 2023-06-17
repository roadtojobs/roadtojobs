import { defineStore } from 'pinia';
import { Stage } from 'shared/entities/stage.entity';
import { computed } from 'vue';
import { stageRepo } from '@/repositories/stage.repo';

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
