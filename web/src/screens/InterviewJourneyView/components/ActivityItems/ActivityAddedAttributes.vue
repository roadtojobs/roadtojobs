<template>
  <div>
    <div class="relative px-1">
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white"
      >
        <TagIcon
          class="h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
  <div class="min-w-0 flex-1 py-0">
    <div class="text-sm leading-8 text-gray-500">
      <span class="mr-0.5">
        <a
          href="javascript:void(0)"
          class="font-medium text-gray-900"
        >
          You
        </a>
        {{ ' ' }}
        added attributes
      </span>
      {{ ' ' }}
      <span class="mr-0.5">
        <template
          v-for="(tag, index) in activity.attributes"
          :key="`${tag.text}-${index}`"
        >
          <a
            href="javascript:void(0)"
            class="relative inline-flex items-center rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <span
              class="absolute flex flex-shrink-0 items-center justify-center"
            >
              <span
                :class="[tag.color, 'h-1.5 w-1.5 rounded-full']"
                aria-hidden="true"
              />
            </span>
            <span class="ml-3 font-semibold text-gray-900">{{ tag.text }}</span>
          </a>
          {{ ' ' }}
        </template>
      </span>
      <span class="whitespace-nowrap">{{ createdDateText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TagIcon } from '@heroicons/vue/24/outline';
import { InterviewJourneyCompanyActivity } from '@/repositories/interviewJourneyCompanyActivity.repo';
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps<{
  activity: InterviewJourneyCompanyActivity;
}>();

const createdDateText = computed(() =>
  dayjs(props.activity.createdAt).fromNow()
);
</script>
