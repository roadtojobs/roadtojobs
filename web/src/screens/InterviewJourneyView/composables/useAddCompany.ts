import { Stage } from 'shared/entities/stage.entity';
import { AddedJourneyItem } from '@/screens/InterviewJourneyView/components/ActionModals/AddJourneyItemModal.methods';

export const useAddCompany = (
  afterAdded: (addedJourneyItem: AddedJourneyItem) => Promise<void>
) => {
  const addCompanyStage = ref<Stage | null>(null);
  const isShowAddCompanyModal = ref(false);

  const onClickAddCompany = (stage: Stage) => {
    addCompanyStage.value = { ...stage };
    isShowAddCompanyModal.value = true;
  };

  const onCloseAddCompany = () => {
    addCompanyStage.value = null;
    isShowAddCompanyModal.value = false;
  };

  const onCreatedJourneyItem = (addedJourneyItem: AddedJourneyItem) => {
    onCloseAddCompany();
    afterAdded(addedJourneyItem);
  };

  return {
    addCompanyStage,
    isShowAddCompanyModal,
    onClickAddCompany,
    onCloseAddCompany,
    onCreatedJourneyItem,
  };
};
