import { JourneyItem } from 'shared/entities/journeyItem.entity';

export const useEditJourneyItem = (journeyItem: JourneyItem) => {
  const isEdit = ref(false);
  const editForm = ref({
    description: '',
    color: '',
    stageId: '',
  });

  const onClickEdit = () => {
    editForm.value.description = journeyItem.description;
    editForm.value.color = journeyItem.color;
    editForm.value.stageId = journeyItem.stageId;

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
