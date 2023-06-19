import { defineStore } from 'pinia';
import { Stage } from 'shared/entities/stage.entity';
import { computed } from 'vue';
import { stageRepo } from '@/repositories/stage.repo';

const isArchived = (stage: Stage) => stage.isArchivedStage;
const isNotArchived = (stage: Stage) => !stage.isArchivedStage;

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
    stages.value.filter(isNotArchived).map((stage) => ({
      text: stage.name,
      value: stage.id,
    }))
  );

  const activeStages = computed(() => stages.value.filter(isNotArchived));
  const archivedStages = computed(() => stages.value.filter(isArchived));

  return { stages, loadStages, comboboxStages, activeStages, archivedStages };
});
