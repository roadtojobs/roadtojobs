import {
  InterviewJourneyCompany,
  interviewJourneyCompanyRepo,
} from '@/repositories/interviewJourneyCompany.repo';
import { computed, onMounted } from 'vue';
import { InterviewJourney } from '@/repositories/interviewJourney.repo';

export const useJourneyItems = (interviewJourney: InterviewJourney) => {
  const interviewJourneyCompanyItems = ref<InterviewJourneyCompany[]>([]);

  onMounted(async () => {
    // get companies of this user
    const journeyCompanyItems = await interviewJourneyCompanyRepo.getByJourney(
      interviewJourney.id
    );
    interviewJourneyCompanyItems.value = [...journeyCompanyItems];
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
  };
};
