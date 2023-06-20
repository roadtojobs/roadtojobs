import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { z } from 'zod';
import useValidation from '@/composable/useValidation';
import { notify } from '@kyvg/vue3-notification';
import { journeyItemRepo } from '@/repositories/journeyItem.repo';

const editJourneyItem = z.object({
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, 'Description is required'),
  color: z.string(),
  stageId: z.string().min(1, 'Stage must be selected'),
  attributes: z.array(
    z.object({
      text: z.string(),
      color: z.string(),
    })
  ),
});

export type EditJourneyItem = z.infer<typeof editJourneyItem>;

export const useEditJourneyItem = (
  journeyItem: JourneyItem,
  onUpdateOk: (updatedValues: EditJourneyItem) => void
) => {
  const isEdit = ref(false);
  const { errorsBag, validate, reset } =
    useValidation<EditJourneyItem>(editJourneyItem);
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
    editForm.value.attributes = journeyItem.attributes || [];

    isEdit.value = true;
  };

  const onClickCancel = () => {
    isEdit.value = false;
  };

  const onSaveEditing = async () => {
    reset();
    const validateResult = validate(editForm.value);
    if (!validateResult.success) {
      return notify({
        type: 'error',
        title: 'Validation Error',
        text: 'Please check the error(s), fix and try again.',
      });
    }

    const updateResult = await journeyItemRepo.update(
      journeyItem.id,
      validateResult.parsedObject
    );
    if (!updateResult) {
      return notify({
        type: 'error',
        title: 'Update Error',
        text: 'There was an error while updating your Journey Item. Please refresh the page and try again.',
      });
    }

    isEdit.value = false;
    onUpdateOk(validateResult.parsedObject);

    return notify({
      type: 'success',
      title: 'Updated',
      text: 'Journey Item updated!',
    });
  };

  return {
    isEdit,
    editForm,
    editJourneyItemErrors: errorsBag,
    onClickEdit,
    onClickCancel,
    onSaveEditing,
  };
};
