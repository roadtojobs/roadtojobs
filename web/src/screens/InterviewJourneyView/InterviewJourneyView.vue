<template>
  <AppPage
    v-if="interviewJourney === undefined"
    header-title="Loading..."
    description="Loading..."
    class="animate-pulse"
  >
    Loading...
  </AppPage>
  <NotFoundScreen v-else-if="interviewJourney === null" />
  <AppPage
    v-else
    :header-title="interviewJourney.name"
    :description="interviewJourney.description"
  >
    <template #right-buttons> </template>
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
import NotFoundScreen from '@/components/NotFoundScreen/NotFoundScreen.vue';

const route = useRoute();
const interviewJourney = ref<InterviewJourney | null>();

onMounted(async () => {
  const record = await interviewJourneyRepo.getById(String(route.params.id));
  interviewJourney.value = record ? { ...record } : null;
});
</script>
