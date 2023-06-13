<template>
  <div class="flex gap-2">
    <div>
      <div class="relative px-1">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white"
        >
          <UserCircleIcon
            class="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
    <div class="min-w-0 flex-1 py-1.5">
      <div class="text-sm text-gray-500">
        <a
          href="javascript:void(0);"
          class="font-medium text-gray-900"
        >
          You
        </a>
        {{ ' ' }}
        created
        {{ ' ' }}
        <a
          href="javascript:void(0);"
          class="font-medium text-gray-900"
        >
          this Journey
        </a>
        {{ ' ' }}
        <span class="whitespace-nowrap"> Jan 04, 2023 </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { InterviewJourneyCompanyActivity } from '@/repositories/interviewJourneyCompanyActivity.repo';

defineProps<{
  activity: InterviewJourneyCompanyActivity;
}>();
</script>
