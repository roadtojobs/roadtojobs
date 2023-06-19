import { ref } from 'vue';

export const useCreateNewCompany = () => {
  const isOpenAddCompany = ref(false);

  const onClickOpenAddCompany = () => (isOpenAddCompany.value = true);

  const onCloseAddCompany = () => (isOpenAddCompany.value = false);

  return {
    isOpenAddCompany,
    onClickOpenAddCompany,
    onCloseAddCompany,
  };
};
