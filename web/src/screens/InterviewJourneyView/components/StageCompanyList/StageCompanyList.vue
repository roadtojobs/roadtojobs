<template>
  <div class="flex flex-row gap-2 w-full">
    <StageCompanyItem
      v-for="journeyCompany in journeyCompanyItems"
      :key="journeyCompany.id"
      :journey-company-item="journeyCompany"
      @click="(item) => $emit('click', item)"
    />
  </div>
</template>

<script setup lang="ts">
import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';
import { Stage } from '@/repositories/stage.repo';
import StageCompanyItem from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyItem.vue';

type StageCompanyListProps = {
  stage: Stage;
  journeyCompanyItems: InterviewJourneyCompany[];
};

defineProps<StageCompanyListProps>();

defineEmits<{
  (e: 'click', journeyCompanyItem: InterviewJourneyCompany): void;
}>();
</script>