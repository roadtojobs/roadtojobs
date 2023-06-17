<template>
  <div
    class="inline-flex items-center rounded-full bg-rose-100 px-3 py-2 text-md font-medium text-rose-800 select-none cursor-pointer"
    @click="$emit('click', journeyCompanyItem)"
  >
    {{ journeyCompanyItem.company?.name }}
  </div>
</template>

<script setup lang="ts">
import { JourneyItemCompany } from 'shared/entities/journeyItem.entity';

type StageCompanyItemProps = {
  journeyCompanyItem: JourneyItemCompany;
};

defineProps<StageCompanyItemProps>();

defineEmits<{
  (e: 'click', journeyCompanyItem: JourneyItemCompany): void;
}>();
</script>
