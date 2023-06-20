import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { Stage } from 'shared/entities/stage.entity';

export type StrictJourneyItem = JourneyItem & { stage: Stage };

export const useViewJourneyItemModal = () => {
  const viewingJourneyItem = ref<StrictJourneyItem | null>(null);
  const isOpen = ref<boolean>(false);

  const viewJourneyItem = (journeyItem: JourneyItem) => {
    if (!journeyItem.stage) {
      return;
    }

    viewingJourneyItem.value = { ...(journeyItem as StrictJourneyItem) };
    isOpen.value = true;
  };

  const closeViewJourneyItem = () => {
    viewingJourneyItem.value = null;
    isOpen.value = false;
  };

  return {
    isOpen,
    viewJourneyItem,
    closeViewJourneyItem,
    viewingJourneyItem,
  };
};
