import { journeyItemRepo } from '@/repositories/journeyItem.repo';
import { notify } from '@kyvg/vue3-notification';

export const useJourneyItemsStageChange = (
  rerenderTable: () => void,
  refreshJourneyItems: () => Promise<void>
) => {
  const updateJourneyItemStage = async ({
    journeyItemId,
    wantedStageId,
  }: {
    journeyItemId: string;
    wantedStageId: string;
  }) => {
    // change state
    const updateStateStatus = await journeyItemRepo.update(journeyItemId, {
      stageId: wantedStageId,
    });

    await refreshJourneyItems().then(rerenderTable);

    if (!updateStateStatus) {
      return notify({
        type: 'error',
        title: 'Error',
        text: 'Advance to stage failed, please try again',
      });
    }
  };

  return {
    updateJourneyItemStage,
  };
};
