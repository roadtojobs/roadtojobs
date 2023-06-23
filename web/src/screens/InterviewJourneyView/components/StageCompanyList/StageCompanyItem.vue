<template>
  <div
    class="journey-node-item inline-flex items-center rounded-full px-3 py-2 text-md font-medium select-none cursor-pointer"
    :class="nodeColor"
    @click="$emit('click', journeyItem)"
  >
    {{ journeyItem.company?.name }}
  </div>
</template>

<script setup lang="ts">
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { computed } from 'vue';
import { getNodeColor } from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyItem.methods';

type StageCompanyItemProps = {
  journeyItem: JourneyItem;
};

type StageCompanyItemEmits = {
  (e: 'click', journeyCompanyItem: JourneyItem): void;
};

const props = defineProps<StageCompanyItemProps>();
defineEmits<StageCompanyItemEmits>();

const nodeColor = computed(() => getNodeColor(props.journeyItem.color));
</script>
