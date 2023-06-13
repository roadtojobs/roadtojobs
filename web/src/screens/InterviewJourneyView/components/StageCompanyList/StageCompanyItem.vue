<template>
  <div
    class="inline-flex items-center rounded-full bg-rose-100 px-3 py-2 text-md font-medium text-rose-800 select-none cursor-pointer"
    @click="$emit('click', journeyCompanyItem)"
  >
    {{ journeyCompanyItem.company?.name }}
  </div>
</template>

<script setup lang="ts">
import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';

type StageCompanyItemProps = {
  journeyCompanyItem: InterviewJourneyCompany;
};

defineProps<StageCompanyItemProps>();

defineEmits<{
  (e: 'click', journeyCompanyItem: InterviewJourneyCompany): void;
}>();
</script>
