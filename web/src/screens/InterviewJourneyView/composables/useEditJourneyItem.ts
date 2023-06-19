import { JourneyItem } from 'shared/entities/journeyItem.entity';

export const useEditJourneyItem = (journeyItem: JourneyItem) => {
  const isEdit = ref(false);
  const editForm = ref({
    description: '',
  });

  const onClickEdit = () => {
    editForm.value.description = journeyItem.description;
    isEdit.value = true;
  };

  const onClickCancel = () => {
    isEdit.value = false;
  };

  return {
    isEdit,
    editForm,
    onClickEdit,
    onClickCancel,
  };
};
