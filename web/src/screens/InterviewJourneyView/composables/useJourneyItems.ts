import { interviewJourneyCompanyRepo } from '@/repositories/interviewJourneyCompany.repo';
import { computed, onMounted } from 'vue';
import { Journey } from 'shared/entities/journey.entity';
import { InterviewJourneyCompany } from 'shared/entities/journeyItem.entity';

export const useJourneyItems = (interviewJourney: Journey) => {
  const interviewJourneyCompanyItems = ref<InterviewJourneyCompany[]>([]);

  const retrieveAll = async () => {
    const journeyCompanyItems = await interviewJourneyCompanyRepo.getByJourney(
      interviewJourney.id
    );
    interviewJourneyCompanyItems.value = [...journeyCompanyItems];
  };

  onMounted(async () => {
    await retrieveAll();
  });

  const stageJourneyCompanyMap = computed(() => {
    return interviewJourneyCompanyItems.value.reduce<
      Record<string, InterviewJourneyCompany[]>
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
