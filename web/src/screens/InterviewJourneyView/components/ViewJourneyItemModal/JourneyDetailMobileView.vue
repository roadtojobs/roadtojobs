<template>
  <aside class="mt-8 xl:hidden">
    <h2 class="sr-only">Details</h2>
    <JourneyItemSpecs
      :stage-value="stageValue"
      :is-editing="isEditing"
      :journey-item="journeyItem"
      :total-activities="totalActivities"
      @update:stage-value="(value) => $emit('update:stageValue', value)"
    />
  </aside>
</template>

<script setup lang="ts">
import { Journey } from 'shared/entities/journey.entity';
import JourneyItemSpecs from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/Utils/JourneyItemSpecs.vue';
import { StrictJourneyItem } from '@/screens/InterviewJourneyView/composables/useViewJourneyItemModal';

type JourneyItemDetailMobileViewProps = {
  journey: Journey;
  journeyItem: StrictJourneyItem;
  totalActivities: number;
  isEditing: boolean;
  stageValue: string;
};

type JourneyItemDetailMobileViewEmits = {
  (e: 'update:stageValue', value: string | number): void;
};

const props = defineProps<JourneyItemDetailMobileViewProps>();
defineEmits<JourneyItemDetailMobileViewEmits>();
</script>
