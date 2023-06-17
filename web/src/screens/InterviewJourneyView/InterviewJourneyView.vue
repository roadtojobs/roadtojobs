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
    :header-title="`My journey: ${interviewJourney.name}`"
    :description="`It begins at ${formattedStartDate} ⭐️`"
    borderless
    body-margin="mt-1"
  >
    <Tabs :tabs="pageTabs">
      <template #info>
        <InfoView :interview-journey="interviewJourney" />
      </template>
      <template #journey>
        <JourneyView
          :interview-journey="interviewJourney"
          :user="user"
        />
      </template>
    </Tabs>
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { ref, onMounted, computed } from 'vue';
import { interviewJourneyRepo } from '@/repositories/interviewJourney.repo';
import { useRoute } from 'vue-router';
import NotFoundScreen from '@/components/NotFoundScreen/NotFoundScreen.vue';
import Tabs from '@/components/Tabs/Tabs.vue';
import { TabItem } from '@/components/Tabs/Tabs.methods';
import { BookmarkIcon, SparklesIcon } from '@heroicons/vue/24/outline';
import dayjs from 'dayjs';
import { DISPLAY_DATE_FORMAT } from '@/constants';
import InfoView from '@/screens/InterviewJourneyView/components/InfoView.vue';
import JourneyView from '@/screens/InterviewJourneyView/components/JourneyView.vue';
import { useCurrentUser } from '@/stores/useCurrentUser';
import { useGlobalStages } from '@/stores/useGlobalStages';
import { Journey } from 'shared/entities/journey.entity';

const route = useRoute();
const { user } = useCurrentUser();
const { loadStages } = useGlobalStages();

const interviewJourney = ref<Journey | null>();
const pageTabs: TabItem[] = [
  {
    id: 'info',
    label: 'Info',
    icon: BookmarkIcon,
  },
  {
    id: 'journey',
    label: 'Journey',
    icon: SparklesIcon,
  },
];

onMounted(async () => {
  const record = await interviewJourneyRepo.getById(String(route.params.id));
  interviewJourney.value = record ? { ...record } : null;

  await loadStages();
});

const formattedStartDate = computed(() => {
  if (!interviewJourney.value?.startedAt) {
    return '-';
  }

  const djsStartDate = dayjs(interviewJourney.value?.startedAt);
  return djsStartDate.format(DISPLAY_DATE_FORMAT);
});
</script>
