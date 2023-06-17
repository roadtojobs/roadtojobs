import { journeyItemRepo } from '@/repositories/journeyItem.repo';
import { computed, onMounted } from 'vue';
import { Journey } from 'shared/entities/journey.entity';
import { JourneyItem } from 'shared/entities/journeyItem.entity';

export const useJourneyItems = (interviewJourney: Journey) => {
  const interviewJourneyCompanyItems = ref<JourneyItem[]>([]);

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

  return {
    interviewJourneyCompanyItems,
    stageJourneyCompanyMap,
    retrieveAll,
  };
};
