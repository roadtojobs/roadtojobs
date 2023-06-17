<template>
  <form action="#">
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
      />
    </div>
    <div class="mt-6 flex items-center justify-end space-x-4">
      <button
        @click="onCloseAndArchive"
        type="button"
        class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <XCircleIcon
          class="-ml-0.5 h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
        Close & Archive
      </button>
      <button
        type="submit"
        @click="onSubmitCreateNote"
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

type NoteCommentFormProps = {
  journeyItem: JourneyItem;
};

type NoteCommentFormEmits = {
  (e: 'created'): void;
};

const props = defineProps<NoteCommentFormProps>();
const emits = defineEmits<NoteCommentFormEmits>();

const form = ref<{
  comment: string;
  journeyItem: string;
}>({
  comment: '',
  journeyItem: props.journeyItem.id,
});

const onSubmitCreateNote = () => {};

const onCloseAndArchive = () => {};
</script>
