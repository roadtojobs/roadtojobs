import { JourneyItem } from 'shared/entities/journeyItem.entity';

type EditJourneyItem = Pick<
  JourneyItem,
  'description' | 'color' | 'stageId' | 'attributes'
>;

export const useEditJourneyItem = (journeyItem: JourneyItem) => {
  const isEdit = ref(false);
  const editForm = ref<EditJourneyItem>({
    description: '',
    color: '',
    stageId: '',
    attributes: [],
  });

  const onClickEdit = () => {
    editForm.value.description = journeyItem.description;
    editForm.value.color = journeyItem.color;
    editForm.value.stageId = journeyItem.stageId;
    editForm.value.attributes = journeyItem.attributes;

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
