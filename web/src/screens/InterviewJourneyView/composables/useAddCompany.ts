import { Stage } from 'shared/entities/stage.entity';

export const useAddCompany = (refreshJourneyItems: () => Promise<void>) => {
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

  const onCreatedJourneyItem = () => {
    refreshJourneyItems();
    onCloseAddCompany();
  };

  return {
    addCompanyStage,
    isShowAddCompanyModal,
    onClickAddCompany,
    onCloseAddCompany,
    onCreatedJourneyItem,
  };
};
