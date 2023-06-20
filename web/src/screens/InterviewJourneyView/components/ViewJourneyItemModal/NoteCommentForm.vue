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
        v-if="!journeyItem.isArchived"
        @click="onCloseAndArchive"
        type="warning"
        :disabled="isLoading"
        :icon="XCircleIcon"
      >
        Note & Archive
      </Button>
      <Button
        @click="onSubmitCreateNote"
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

type NoteCommentFormProps = {
  journeyItem: JourneyItem;
};

type NoteCommentFormEmits = {
  (e: 'created'): void;
};

const props = defineProps<NoteCommentFormProps>();
const emits = defineEmits<NoteCommentFormEmits>();

const { userId } = useCurrentUser();

const form = ref({
  comment: '',
  journeyItemId: props.journeyItem.id,
  type: 'ADDED_NOTE',
});

const { isLoading, startLoading, stopLoading } = useLoading();
const { errorsBag, validate, reset } = useValidation<CreateCommentActivity>(
  createCommentActivity
);

const onSubmitCreateNote = async () => {
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

  stopLoading();

  if (!createdNote) {
    return notify({
      type: 'error',
      title: 'Creation Error',
      text: 'There was an error while creating the comment. Please try again.',
    });
  }

  emits('created');
  form.value.comment = '';
};

const onCloseAndArchive = () => {};
</script>
