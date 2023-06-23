import { journeyItemRepo } from '@/repositories/journeyItem.repo';
import { computed, onMounted } from 'vue';
import { Journey } from 'shared/entities/journey.entity';
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { EditJourneyItem } from '@/screens/InterviewJourneyView/composables/useEditJourneyItem';
import { useGlobalStages } from '@/stores/useGlobalStages';
import { isString } from 'lodash-es';

export const useJourneyItems = (interviewJourney: Journey) => {
  const journeyItems = ref<JourneyItem[]>([]);
  const globalStages = useGlobalStages();

  const retrieveAll = async () => {
    const journeyCompanyItems = await journeyItemRepo.getByJourney(
      interviewJourney.id
    );
    journeyItems.value = [...journeyCompanyItems];
  };

  onMounted(async () => {
    await retrieveAll();
  });

  const stageJourneyCompanyMap = computed(() => {
    return journeyItems.value.reduce<Record<string, JourneyItem[]>>(
      (record, journeyCompany) => {
        record[journeyCompany.stageId] ??= [];
        record[journeyCompany.stageId].push(journeyCompany);

        return record;
      },
      {}
    );
  });

  const updateJourneyItem = (
    journeyItemId: string,
    values: EditJourneyItem
  ) => {
    const journeyItem = journeyItems.value.find(
      (item) => item.id === journeyItemId
    );
    if (!journeyItem) {
      return;
    }

    journeyItem.description = values.description;
    journeyItem.color = values.color;
    journeyItem.attributes = values.attributes;
    updateJourneyItemStage(journeyItem, values.stageId);
  };

  const updateJourneyItemStage = (
    journeyItemId: string | JourneyItem,
    stageId: string
  ) => {
    // NOTE: not sure if we have another elegant way to code these ifs
    let journeyItem: string | JourneyItem;
    if (isString(journeyItemId)) {
      const foundItem = journeyItems.value.find(
        (item) => item.id === journeyItemId
      );

      if (!foundItem) {
        return;
      }

      journeyItem = foundItem;
    } else {
      journeyItem = journeyItemId;
    }

    journeyItem.stageId = stageId;
    journeyItem.stage = globalStages.stages.find(
      (stage) => stage.id === stageId
    );
    journeyItem.isArchived = !!journeyItem.stage?.isArchivedStage;
  };

  return {
    journeyItems,
    stageJourneyCompanyMap,
    retrieveAll,
    updateJourneyItem,
    updateJourneyItemStage,
  };
};
