<template>
  <div
    class="inline-flex items-center rounded-full bg-rose-100 px-3 py-2 text-md font-medium text-rose-800 select-none cursor-pointer"
  >
    {{ journeyCompanyItem.companyId }}
  </div>
</template>

<script setup lang="ts">
import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';

type StageCompanyItemProps = {
  journeyCompanyItem: InterviewJourneyCompany;
};

defineProps<StageCompanyItemProps>();
</script>

<style scoped></style>
