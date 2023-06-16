import { Stage } from '@/repositories/stage.repo';

export const useAddCompany = () => {
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

  return {
    addCompanyStage,
    isShowAddCompanyModal,
    onClickAddCompany,
    onCloseAddCompany,
  };
};
