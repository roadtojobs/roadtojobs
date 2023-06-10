<template>
  <div v-if="interviewJourney === undefined">Loading...</div>
  <div v-else-if="interviewJourney === null">Journey not found</div>
  <AppPage
    v-else
    :header-title="interviewJourney.name"
    :description="interviewJourney.description"
  >
    hehe
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { ref, onMounted } from 'vue';
import {
  InterviewJourney,
  interviewJourneyRepo,
} from '@/repositories/interviewJourney.repo';
import { useRoute } from 'vue-router';

const route = useRoute();
const interviewJourney = ref<InterviewJourney | null>();

onMounted(async () => {
  const record = await interviewJourneyRepo.getById(String(route.params.id));
  interviewJourney.value = record ? { ...record } : null;
});
</script>
