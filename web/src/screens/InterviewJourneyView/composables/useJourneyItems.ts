import { journeyItemRepo } from '@/repositories/journeyItem.repo';
import { computed, onMounted } from 'vue';
import { Journey } from 'shared/entities/journey.entity';
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { EditJourneyItem } from '@/screens/InterviewJourneyView/composables/useEditJourneyItem';
import { useGlobalStages } from '@/stores/useGlobalStages';

export const useJourneyItems = (interviewJourney: Journey) => {
  const interviewJourneyCompanyItems = ref<JourneyItem[]>([]);
  const globalStages = useGlobalStages();

  const retrieveAll = async () => {
    const journeyCompanyItems = await journeyItemRepo.getByJourney(
      interviewJourney.id
    );
    interviewJourneyCompanyItems.value = [...journeyCompanyItems];
  };

  onMounted(async () => {
    await retrieveAll();
  });

  const stageJourneyCompanyMap = computed(() => {
    return interviewJourneyCompanyItems.value.reduce<
      Record<string, JourneyItem[]>
    >((record, journeyCompany) => {
      record[journeyCompany.stageId] ??= [];
      record[journeyCompany.stageId].push(journeyCompany);

      return record;
    }, {});
  });

  const updateJourneyItem = (
    journeyItemId: string,
    values: EditJourneyItem
  ) => {
    const journeyItem = interviewJourneyCompanyItems.value.find(
      (item) => item.id === journeyItemId
    );
    if (!journeyItem) {
      return;
    }

    journeyItem.description = values.description;
    journeyItem.color = values.color;
    journeyItem.attributes = values.attributes;
    journeyItem.stageId = values.stageId;
    journeyItem.stage = globalStages.stages.find(
      (stage) => stage.id === values.stageId
    );
  };

  return {
    interviewJourneyCompanyItems,
    stageJourneyCompanyMap,
    retrieveAll,
    updateJourneyItem,
  };
};
