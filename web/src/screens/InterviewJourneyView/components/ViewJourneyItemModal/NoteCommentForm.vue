<template>
  <form @submit.prevent>
    <div>
      <label
        for="comment"
        class="sr-only"
      >
        Comment
      </label>
      <Textarea
        v-model="form.comment"
        label=""
        placeholder="Leave a note, comment for your journey item. Markdown supported!"
        rows="4"
        :error="errorsBag.get('comment')"
      />
    </div>
    <div class="mt-6 flex items-center justify-end space-x-4">
      <Button
        v-if="!journeyItem.isArchived && canEditJourney"
        @click="onSubmitCreateNote(onCloseAndArchive)"
        type="warning"
        :disabled="isLoading"
        :icon="XCircleIcon"
      >
        Note & Archive
      </Button>
      <Button
        @click="onSubmitCreateNote(undefined)"
        :disabled="isLoading"
        :icon="DocumentPlusIcon"
      >
        Note
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { XCircleIcon, DocumentPlusIcon } from '@heroicons/vue/24/outline';
import Textarea from '@/components/Textarea/Textarea.vue';
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { useLoading } from '@/composable/useLoading';
import useValidation from '@/composable/useValidation';
import {
  createCommentActivity,
  CreateCommentActivity,
} from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/NoteCommentForm.methods';
import { notify } from '@kyvg/vue3-notification';
import { journeyItemActivityRepo } from '@/repositories/journeyItemActivity.repo';
import { useCurrentUser } from '@/stores/useCurrentUser';
import Button from '@/components/Button/Button.vue';
import { journeyItemRepo } from '@/repositories/journeyItem.repo';
import { useGlobalStages } from '@/stores/useGlobalStages';
import { useCurrentJourney } from '@/stores/useCurrentJourney';

type NoteCommentFormProps = {
  journeyItem: JourneyItem;
};

type NoteCommentFormEmits = {
  (e: 'created'): void;
  (e: 'created-with-archived', stageId: string): void;
};

const props = defineProps<NoteCommentFormProps>();
const emits = defineEmits<NoteCommentFormEmits>();

const { userId } = useCurrentUser();
const { archivedStages } = useGlobalStages();
const { canEditJourney } = useCurrentJourney();

const form = ref({
  comment: '',
  journeyItemId: props.journeyItem.id,
  type: 'ADDED_NOTE',
});

const { isLoading, startLoading, stopLoading } = useLoading();
const { errorsBag, validate, reset } = useValidation<CreateCommentActivity>(
  createCommentActivity
);

const onSubmitCreateNote = async (customAction?: () => void) => {
  reset();
  const validateResult = validate({ ...form.value, userId });

  if (!validateResult.success) {
    return notify({
      type: 'error',
      title: 'Validation Error',
      text: 'Please check the error(s), fix and try again.',
    });
  }

  startLoading();

  const createdNote = await journeyItemActivityRepo.createNote(
    validateResult.parsedObject
  );

  if (!createdNote) {
    stopLoading();

    return notify({
      type: 'error',
      title: 'Creation Error',
      text: 'There was an error while creating the comment. Please try again.',
    });
  }

  form.value.comment = '';

  if (customAction && typeof customAction === 'function') {
    await customAction();
    stopLoading();
    return;
  }

  stopLoading();
  emits('created');
};

const onCloseAndArchive = async () => {
  const archivedStageId = archivedStages[0].id;
  await journeyItemRepo.update(props.journeyItem.id, {
    stageId: archivedStageId,
  });

  notify({
    type: 'warning',
    title: 'Note & Archive',
    text: 'Your note is added and this journey item has been archived.',
  });

  emits('created-with-archived', archivedStageId);
};
</script>
