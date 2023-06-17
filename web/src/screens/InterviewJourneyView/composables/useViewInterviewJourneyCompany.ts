import { InterviewJourneyCompany } from 'shared/entities/journeyItem.entity';

export const useViewInterviewJourneyCompany = () => {
  const interviewJourneyCompany = ref<InterviewJourneyCompany | null>(null);
  const isOpen = ref<boolean>(false);

  const viewJourneyItem = (journeyItem: InterviewJourneyCompany) => {
    interviewJourneyCompany.value = { ...journeyItem };
    isOpen.value = true;
  };

  const closeViewJourneyItem = () => {
    interviewJourneyCompany.value = null;
    isOpen.value = false;
  };

  return {
    isOpen,
    viewJourneyItem,
    closeViewJourneyItem,
    interviewJourneyCompany,
  };
};
