<template>
  <div class="mt-2">Journey View</div>
</template>

<script setup lang="ts">
import { InterviewJourney } from '@/repositories/interviewJourney.repo';

type InfoViewProps = {
  interviewJourney: InterviewJourney;
};

const props = defineProps<InfoViewProps>();
</script>
