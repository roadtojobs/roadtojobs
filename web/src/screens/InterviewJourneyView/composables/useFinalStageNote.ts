import { Ref, ref } from 'vue';
import { JourneyItemAdvancedStage } from '@/screens/InterviewJourneyView/composables/useJourneyItemsStageChange';
import { useGlobalStages } from '@/stores/useGlobalStages';
import { JourneyItem, Stage } from 'shared';

export const useFinalStageNote = ({
  journeyItems,
}: {
  journeyItems: Ref<JourneyItem[]>;
}) => {
  // dependencies
  const { activeStages } = useGlobalStages();

  // vars
  const isOpenFinalStageNoteModal = ref(false);
  const finalNoteStage = ref<Stage>();
  const finalNoteJourneyItem = ref<JourneyItem>();

  const openFinalStageNoteModal = (info: JourneyItemAdvancedStage) => {
    const foundStage = activeStages.find(
      (stage) => stage.id === info.wantedStageId
    );
    const foundJourneyItem = journeyItems.value.find(
      (item) => item.id === info.journeyItemId
    );

    if (!foundStage || !foundJourneyItem) {
      return;
    }

    if (!foundStage.isFinalStage) {
      return;
    }

    finalNoteStage.value = foundStage;
    finalNoteJourneyItem.value = foundJourneyItem;
    isOpenFinalStageNoteModal.value = true;
  };

  const addedCompanyNote = () => {
    finalNoteStage.value = undefined;
    finalNoteJourneyItem.value = undefined;
    isOpenFinalStageNoteModal.value = false;
  };

  return {
    isOpenFinalStageNoteModal,
    openFinalStageNoteModal,
    finalNoteStage,
    finalNoteJourneyItem,
    addedCompanyNote,
  };
};
