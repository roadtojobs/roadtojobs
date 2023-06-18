<template>
  <div
    class="inline-flex items-center rounded-full px-3 py-2 text-md font-medium select-none cursor-pointer"
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

const props = defineProps<StageCompanyItemProps>();

defineEmits<{
  (e: 'click', journeyCompanyItem: JourneyItem): void;
}>();

const nodeColor = computed(() => getNodeColor(props.journeyItem.color));
</script>
