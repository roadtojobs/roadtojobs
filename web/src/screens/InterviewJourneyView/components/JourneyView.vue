<template>
  <div class="hidden md:block">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr class="divide-x divide-gray-200">
              <th
                scope="col"
                class="w-64 py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Stage
              </th>
              <th
                scope="col"
                class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Companies
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="stage in stages"
              :key="stage.id"
              class="divide-x divide-gray-200"
            >
              <td
                class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0"
              >
                <ViewStageDescription :stage="stage" />
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                No company here 👀
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InterviewJourney } from '@/repositories/interviewJourney.repo';
import { onMounted } from 'vue';
import { Stage, stageRepo } from '@/repositories/stage.repo';
import ViewStageDescription from '@/screens/InterviewJourneyView/components/ViewStageDescription.vue';

type InfoViewProps = {
  interviewJourney: InterviewJourney;
};

const props = defineProps<InfoViewProps>();

const stages = ref<Stage[]>([]);

onMounted(async () => {
  // get stages
  stages.value = [...(await stageRepo.getAll())];

  // get companies
});
</script>
