<template>
  <NotFoundScreen v-if="notFound" />
  <AppPage
    v-else-if="interviewJourney.id.length === 0"
    header-title="Loading..."
    description="Loading..."
    class="animate-pulse"
  >
    Loading...
  </AppPage>
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
      <template #archived>
        <ArchivedJourneyView :journey="interviewJourney" />
      </template>
    </Tabs>
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { ref, onMounted, computed } from 'vue';
import { journeyRepo } from '@/repositories/journey.repo';
import { useRoute } from 'vue-router';
import NotFoundScreen from '@/components/NotFoundScreen/NotFoundScreen.vue';
import Tabs from '@/components/Tabs/Tabs.vue';
import { TabItem } from '@/components/Tabs/Tabs.methods';
import {
  BookmarkIcon,
  SparklesIcon,
  FolderIcon,
} from '@heroicons/vue/24/outline';
import dayjs from 'dayjs';
import { DISPLAY_DATE_FORMAT } from '@/constants';
import InfoView from '@/screens/InterviewJourneyView/components/InfoView.vue';
import JourneyView from '@/screens/InterviewJourneyView/components/JourneyView.vue';
import { useCurrentUser } from '@/stores/useCurrentUser';
import { useGlobalStages } from '@/stores/useGlobalStages';
import { Journey } from 'shared/entities/journey.entity';
import { useCurrentJourney } from '@/stores/useCurrentJourney';
import ArchivedJourneyView from '@/screens/InterviewJourneyView/components/ArchivedJourneyView.vue';

const route = useRoute();
const { user } = useCurrentUser();
const { loadStages } = useGlobalStages();
const currentJourney = useCurrentJourney();

const interviewJourney = computed(() => currentJourney.journey);
const notFound = ref(false);
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
  {
    id: 'archived',
    label: 'Archived',
    icon: FolderIcon,
  },
];

onMounted(async () => {
  const record = await journeyRepo.getById(String(route.params.id));
  if (!record) {
    notFound.value = true;
    return;
  }

  currentJourney.setJourney(record);
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
