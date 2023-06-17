<template>
  <div class="relative">
    <img
      class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
      src="../../../../../assets/images/logo.png"
      alt=""
    />

    <span
      class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px"
    >
      <DocumentTextIcon
        class="h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </span>
  </div>
  <div class="min-w-0 flex-1">
    <div>
      <div class="text-sm">
        <a
          href="javascript:void(0);"
          class="font-medium text-gray-900"
        >
          You
        </a>
      </div>
      <p class="mt-0.5 text-sm text-gray-500">{{ commentedDateText }}</p>
    </div>
    <div class="mt-2 text-sm text-gray-700">
      <p>{{ activity.comment }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentTextIcon } from '@heroicons/vue/24/outline';
import { InterviewJourneyCompanyActivity } from '@/repositories/interviewJourneyCompanyActivity.repo';
import { computed } from 'vue';
import { getFromAgoTime } from '@/utils/date';

const props = defineProps<{
  activity: InterviewJourneyCompanyActivity;
}>();

const commentedDateText = computed(
  () => `Noted ${getFromAgoTime(props.activity.createdAt)}`
);
</script>
