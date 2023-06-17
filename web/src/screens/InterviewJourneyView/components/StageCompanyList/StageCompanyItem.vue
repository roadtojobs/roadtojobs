<template>
  <div
    class="inline-flex items-center rounded-full px-3 py-2 text-md font-medium select-none cursor-pointer"
    :class="nodeColor"
    @click="$emit('click', journeyCompanyItem)"
  >
    {{ journeyCompanyItem.company?.name }}
  </div>
</template>

<script setup lang="ts">
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { computed } from 'vue';

type StageCompanyItemProps = {
  journeyCompanyItem: JourneyItem;
};

const props = defineProps<StageCompanyItemProps>();

defineEmits<{
  (e: 'click', journeyCompanyItem: JourneyItem): void;
}>();

const nodeColor = computed(() => {
  switch (props.journeyCompanyItem.color) {
    case 'gray':
      return 'bg-gray-100 text-gray-800';
    case 'pink':
      return 'bg-pink-100 text-pink-800';
    case 'purple':
      return 'bg-purple-100 text-purple-800';
    case 'indigo':
      return 'bg-indigo-100 text-indigo-800';
    case 'yellow':
      return 'bg-yellow-100 text-yellow-800';
    case 'sky':
      return 'bg-sky-100 text-sky-800';
    case 'blue':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-rose-100 text-rose-800';
  }
});
</script>
