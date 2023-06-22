<template>
  <div class="space-y-5 mt-4">
    <div class="flex items-center space-x-2">
      <PaperAirplaneIcon
        class="h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
      <StageText
        v-if="!isEditing"
        :stage="journeyItem.stage"
      />
      <Dropdown
        v-else
        label=""
        class="w-full"
        item-classes="flex gap-2"
        :model-value="stageValue"
        :items="dropdownItems"
        @update:model-value="(value) => $emit('update:stageValue', value)"
      />
    </div>
    <div class="flex items-center space-x-2">
      <StarIcon
        class="h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
      <span class="text-sm font-medium text-gray-900">
        {{ totalActivities }} activities
      </span>
    </div>
    <div class="flex items-center space-x-2">
      <CalendarIcon
        class="h-5 w-5 text-gray-500"
        aria-hidden="true"
      />
      <span class="text-sm font-medium text-gray-900">
        Created on
        <time>{{ createdDateText }}</time>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import StageText from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/Utils/StageText.vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import {
  CalendarIcon,
  PaperAirplaneIcon,
  StarIcon,
} from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { getDisplayDate } from '@/utils/date';
import { Stage } from '../../../../../../../shared/src/entities/stage.entity';
import { JourneyItem } from '../../../../../../../shared/src/entities/journeyItem.entity';
import { useGlobalStages } from '@/stores/useGlobalStages';

const createdDateText = computed(() =>
  getDisplayDate(props.journeyItem.createdAt)
);

type JourneyItemSpecsProps = {
  journeyItem: JourneyItem & { stage: Stage };
  isEditing: boolean;
  stageValue: string;
  totalActivities: number;
};

type JourneyItemSpecsEmits = {
  (e: 'update:stageValue', value: string | number): void;
};

const props = defineProps<JourneyItemSpecsProps>();
const emits = defineEmits<JourneyItemSpecsEmits>();

const globalStages = useGlobalStages();

const dropdownItems = computed(() =>
  globalStages.stages
    .filter((stage) => {
      return props.journeyItem.isArchived || !stage.isArchivedStage;
    })
    .map((stage) => ({
      text: stage.name,
      value: stage.id,
    }))
);
</script>
