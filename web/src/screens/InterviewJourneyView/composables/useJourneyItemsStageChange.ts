import { journeyItemRepo } from '@/repositories/journeyItem.repo';
import { notify } from '@kyvg/vue3-notification';

export type JourneyItemAdvancedStage = {
  journeyItemId: string;
  wantedStageId: string;
};

export const useJourneyItemsStageChange = (
  rerenderTable: () => void,
  refreshJourneyItems: () => Promise<void>,
  afterUpdated?: (info: JourneyItemAdvancedStage) => void
) => {
  const updateJourneyItemStage = async ({
    journeyItemId,
    wantedStageId,
  }: JourneyItemAdvancedStage) => {
    // change state
    const updateStateStatus = await journeyItemRepo.moveStage(
      journeyItemId,
      wantedStageId
    );

    await refreshJourneyItems().then(rerenderTable);

    if (!updateStateStatus) {
      return notify({
        type: 'error',
        title: 'Error',
        text: 'Advance to stage failed, please try again',
      });
    }

    afterUpdated?.({ journeyItemId, wantedStageId });
  };

  return {
    updateJourneyItemStage,
  };
};
