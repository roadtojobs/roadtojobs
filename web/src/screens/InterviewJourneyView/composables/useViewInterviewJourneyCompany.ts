import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';

export const useViewInterviewJourneyCompany = () => {
  const interviewJourneyCompany = ref<InterviewJourneyCompany>();
  const isOpen = ref<boolean>(false);

  const viewJourneyItem = (journeyItem: InterviewJourneyCompany) => {
    interviewJourneyCompany.value = { ...journeyItem };
    isOpen.value = true;
  };

  const closeViewJourneyItem = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    viewJourneyItem,
    closeViewJourneyItem,
    interviewJourneyCompany,
  };
};
