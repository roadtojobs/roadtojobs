<template>
  <aside class="mt-8 xl:hidden">
    <h2 class="sr-only">Details</h2>
    <div class="space-y-5">
      <div class="flex items-center space-x-2">
        <PaperAirplaneIcon
          class="h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
        <StageText
          v-if="journeyItem.stage"
          :stage="journeyItem.stage"
        />
      </div>
      <div class="flex items-center space-x-2">
        <StarIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <span class="text-sm font-medium text-gray-900">
          {{ totalActivities }} activities
        </span>
      </div>
      <div class="flex items-center space-x-2">
        <CalendarIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <span class="text-sm font-medium text-gray-900">
          Created on
          <time>{{ createdDateText }}</time>
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import StageText from '@/screens/InterviewJourneyView/components/Utils/StageText.vue';
import {
  CalendarIcon,
  PaperAirplaneIcon,
  StarIcon,
} from '@heroicons/vue/24/outline';

import { Journey } from 'shared/entities/journey.entity';
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { computed } from 'vue';
import { getDisplayDate } from '@/utils/date';

type JourneyItemDetailMobileViewProps = {
  journey: Journey;
  journeyItem: JourneyItem;
  totalActivities: number;
};

const props = defineProps<JourneyItemDetailMobileViewProps>();

const createdDateText = computed(() =>
  getDisplayDate(props.journeyItem.createdAt)
);
</script>
