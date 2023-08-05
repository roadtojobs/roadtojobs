<template>
  <div
    v-if="latestJourney"
    class="bg-white border rounded-xl m-4"
  >
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900">
        Quick Access 🏎️
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p><strong>Latest:</strong> {{ latestJourney.name }}</p>
      </div>
      <div class="mt-5">
        <Button
          class="w-full justify-center"
          :icon="BookmarkIcon"
          @click="
            $router.push({
              name: 'interview-journey-view',
              params: { id: pickThingId(latestJourney.id) },
            })
          "
        >
          View
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue';
import { BookmarkIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { Journey } from 'shared';
import { journeyRepo } from '@/repositories/journey.repo';
import { pickThingId } from '@/utils/surrealThing';
const latestJourney = ref<Journey | undefined>(undefined);

onMounted(async () => {
  latestJourney.value = await journeyRepo.getLatestActiveJourney();
});
</script>
