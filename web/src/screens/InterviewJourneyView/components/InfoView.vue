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
        @click="isEditing = true"
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
        @click="isEditing = false"
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
import { isString } from 'lodash-es';
import { Journey } from 'shared/entities/journey.entity';
import Textarea from '@/components/Textarea/Textarea.vue';
import Input from '@/components/Input/Input.vue';
import { parseServerDate } from '@/utils/date';

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

const renderItems = computed<RenderItem[]>((): RenderItem[] => {
  const journey = props.interviewJourney;

  // () => h(..) is a strategy to render on demand
  // we don't need to render the VNode on runtime
  return [
    {
      label: 'Journey Description 📖',
      Text: () => h(MarkdownContent, () => journey.description),
      key: 'description',
      EditComponent: () =>
        h(Textarea, {
          modelValue: journey.description.trim(),
          rows: 8,
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
          modelValue: journey.note?.trim() ?? '',
          rows: 8,
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
          modelValue: parseServerDate(journey.startedAt),
          type: 'date',
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

const isEditing = ref(false);
</script>
