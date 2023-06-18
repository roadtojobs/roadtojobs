<template>
  <div>
    <div class="mt-2">
      <dl class="divide-y divide-gray-100">
        <div
          v-for="item in renderItems"
          :key="`${item.key}-show`"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm font-medium leading-6 text-gray-900">
            {{ item.label }}
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <component
              v-if="!isEditing || !item.EditComponent"
              :is="item.Text"
            />
            <component
              v-else
              :is="item.EditComponent"
            />
          </dd>
        </div>
      </dl>
    </div>
    <div
      class="mt-2 border-t border-t-gray-100 pt-4 flex flex-row-reverse items-center gap-x-2"
    >
      <!-- View -->
      <Button
        v-if="!isEditing"
        @click="onClickEdit"
        is-loading
      >
        Edit
      </Button>
      <Button
        v-if="!isEditing"
        type="secondary"
        @click="$router.push({ name: 'interview-journey' })"
      >
        Back
      </Button>
      <!-- Editing -->
      <Button
        v-if="isEditing"
        @click="onSubmitEdit"
      >
        Submit
      </Button>
      <Button
        v-if="isEditing"
        type="secondary"
        @click="isEditing = false"
      >
        Cancel
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';
import { DISPLAY_DATE_FORMAT } from '@/constants';
import Button from '@/components/Button/Button.vue';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent.vue';
import { VueComponent } from '@/types';
import { Journey } from 'shared/entities/journey.entity';
import Textarea from '@/components/Textarea/Textarea.vue';
import Input from '@/components/Input/Input.vue';
import { parseServerDate } from '@/utils/date';
import { journeyRepo, UpdateJourney } from '@/repositories/journey.repo';
import useValidation from '@/composable/useValidation';
import { updateJourney } from '@/screens/InterviewJourneyView/components/InfoView.methods';
import { notify } from '@kyvg/vue3-notification';
import { useCurrentJourney } from '@/stores/useCurrentJourney';

type InfoViewProps = {
  interviewJourney: Journey;
};

const props = defineProps<InfoViewProps>();

type RenderItem = {
  key: keyof Journey;
  label: string;
  Text: VueComponent;
  EditComponent?: VueComponent;
};

const isEditing = ref(false);
const editForm = ref<UpdateJourney>({
  name: '',
  description: '',
  note: '',
  startedAt: new Date(),
});
const { errorsBag, validate, reset } =
  useValidation<UpdateJourney>(updateJourney);
const { mergePartial: updateJourneyPartially } = useCurrentJourney();

const renderItems = computed<RenderItem[]>((): RenderItem[] => {
  const journey = props.interviewJourney;

  // () => h(..) is a strategy to render on demand
  // we don't need to render the VNode on runtime
  return [
    {
      label: 'Journey Name 💼',
      Text: () =>
        h('span', {
          innerText: journey.name,
        }),
      key: 'name',
      EditComponent: () =>
        h(Input, {
          modelValue: editForm.value.name,
          error: errorsBag.value.get('name'),
          'onUpdate:modelValue'(value: string) {
            editForm.value.name = value;
          },
        }),
    },
    {
      label: 'Journey Description 📖',
      Text: () => h(MarkdownContent, () => journey.description),
      key: 'description',
      EditComponent: () =>
        h(Textarea, {
          modelValue: editForm.value.description,
          rows: 8,
          error: errorsBag.value.get('description'),
          'onUpdate:modelValue'(value: string) {
            editForm.value.description = value;
          },
        }),
    },
    {
      label: 'Personal Goals/Notes 🚀',
      Text: () =>
        journey.note
          ? h(MarkdownContent, () => journey.note)
          : h('span', { innerText: '-' }),
      key: 'note',
      EditComponent: () =>
        h(Textarea, {
          modelValue: editForm.value.note,
          rows: 8,
          error: errorsBag.value.get('note'),
          'onUpdate:modelValue'(value: string) {
            editForm.value.note = value;
          },
        }),
    },
    {
      label: 'Journey Started At 🏎️',
      Text: () =>
        h('span', {
          innerText: dayjs(journey.startedAt).format(DISPLAY_DATE_FORMAT),
        }),
      key: 'startedAt',
      EditComponent: () =>
        h(Input, {
          modelValue: parseServerDate(editForm.value.startedAt),
          type: 'date',
          error: errorsBag.value.get('startedAt'),
          'onUpdate:modelValue'(value: string) {
            editForm.value.startedAt = new Date(value);
          },
        }),
    },
    {
      label: 'Journey Ended At 🔥',
      Text: () =>
        h('span', {
          innerText: journey.endedAt
            ? dayjs(journey.endedAt).format(DISPLAY_DATE_FORMAT)
            : 'To be determined...',
        }),
      key: 'endedAt',
    },
  ];
});

const onClickEdit = () => {
  editForm.value = {
    name: props.interviewJourney.name,
    description: props.interviewJourney.description,
    note: props.interviewJourney.note || '',
    startedAt: props.interviewJourney.startedAt,
  };

  isEditing.value = true;
};

const onSubmitEdit = async () => {
  reset();
  const validateResult = validate({
    ...editForm.value,
  });

  if (!validateResult.success) {
    return notify({
      type: 'error',
      title: 'Validation Error',
      text: 'Please check the error(s), fix and try again.',
    });
  }

  // update
  const updateResult = await journeyRepo.update(
    props.interviewJourney.id,
    validateResult.parsedObject
  );

  if (!updateResult) {
    return notify({
      type: 'error',
      title: 'Update Error',
      text: 'There was an error while updating your Journey. Please refresh the page and try again.',
    });
  }

  updateJourneyPartially(updateResult);
  isEditing.value = false;

  return notify({
    type: 'success',
    title: 'Updated',
    text: 'Your journey was updated successfully!',
  });
};
</script>
