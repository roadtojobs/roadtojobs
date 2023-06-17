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
      <button
        @click="onCloseAndArchive"
        :disabled="isLoading"
        class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <XCircleIcon
          class="-ml-0.5 h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
        Close & Archive
      </button>
      <button
        @click="onSubmitCreateNote"
        :disabled="isLoading"
        class="inline-flex items-center justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
      >
        Note
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/outline';
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
