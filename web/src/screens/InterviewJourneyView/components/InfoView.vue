<template>
  <div>
    <div class="mt-2">
      <dl class="divide-y divide-gray-100">
        <div
          v-for="item in renderItems"
          :key="item.key"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm font-medium leading-6 text-gray-900">
            {{ item.label }}
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ item.text }}
          </dd>
        </div>
      </dl>
    </div>
    <div
      class="mt-2 border-t border-t-gray-100 pt-4 flex flex-row-reverse items-center gap-x-2"
    >
      <Button>Update Info</Button>
      <Button
        type="secondary"
        @click="$router.push({ name: 'interview-journey' })"
      >
        Back
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InterviewJourney } from '@/repositories/interviewJourney.repo';
import { computed } from 'vue';
import dayjs from 'dayjs';
import { DISPLAY_DATE_FORMAT } from '@/constants';
import Button from '@/components/Button/Button.vue';

type InfoViewProps = {
  interviewJourney: InterviewJourney;
};

const props = defineProps<InfoViewProps>();

type RenderItem = {
  key: keyof InterviewJourney;
  label: string;
  text: string;
  type: 'text' | 'date';
};

const renderItems = computed<RenderItem[]>((): RenderItem[] => {
  const journey = props.interviewJourney;

  return [
    {
      label: 'Journey Description 📖',
      text: journey.description,
      key: 'description',
      type: 'text',
    },
    {
      label: 'Personal Goals/Notes 🚀',
      text: journey.note || '-',
      key: 'note',
      type: 'text',
    },
    {
      label: 'Journey Started At 🏎️',
      text: dayjs(journey.startedAt).format(DISPLAY_DATE_FORMAT),
      key: 'startedAt',
      type: 'date',
    },
    {
      label: 'Journey Ended At 🔥',
      text: journey.endedAt
        ? dayjs(journey.endedAt).format(DISPLAY_DATE_FORMAT)
        : 'To be determined...',
      key: 'endedAt',
      type: 'date',
    },
  ];
});
</script>

<style scoped></style>
