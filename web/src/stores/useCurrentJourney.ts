import { defineStore } from 'pinia';
import { computed } from 'vue';
import { Journey } from 'shared/entities/journey.entity';

export const useCurrentJourney = defineStore('currentJourney', () => {
  // This is intended not to have a Journey | undefined
  // after retrieved the journey from InterviewJourneyView.vue
  // if ok, we'll set the journey immediately.
  // Otherwise, user will use page 404, nodata will set, and nothing can use the currentJourney
  const journey = ref<Journey>({
    id: '',
    name: '',
    description: '',
    note: '',
    startedAt: new Date(),
    endedAt: null,
    endedReason: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    archivedAt: null,
  });

  const setJourney = (currentJourney: Journey) => {
    journey.value = { ...currentJourney };
  };

  const journeyId = computed(() => journey.value.id);

  return { journey, setJourney, journeyId };
});
