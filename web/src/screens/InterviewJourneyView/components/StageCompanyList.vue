<template>
  <div>
    <div
      v-for="journeyCompany in journeyCompanyItems"
      :key="journeyCompany.id"
    >
      {{ journeyCompany.companyId }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';
import { Stage } from '@/repositories/stage.repo';

type StageCompanyListProps = {
  stage: Stage;
  journeyCompanyItems: InterviewJourneyCompany[];
};

defineProps<StageCompanyListProps>();
</script>

<style scoped></style>
