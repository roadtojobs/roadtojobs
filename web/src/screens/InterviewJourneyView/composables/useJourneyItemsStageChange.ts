import { Ref } from 'vue';
import { interviewJourneyCompanyRepo } from '@/repositories/interviewJourneyCompany.repo';
import { notify } from '@kyvg/vue3-notification';

export const useJourneyItemsStageChange = (
  tableKey: Ref<string>,
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
    const updateStateStatus = await interviewJourneyCompanyRepo.update(
      journeyItemId,
      { stage: wantedStageId }
    );

    await refreshJourneyItems();
    tableKey.value = `table-key-${Math.random()}`;

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
