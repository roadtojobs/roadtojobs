<template>
  <div>
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
              v-for="stage in archivedStages"
              :key="stage.id"
              class="divide-x divide-gray-200"
            >
              <td
                class="whitespace-nowrap py-6 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0"
              >
                <ViewStageDescription
                  :interview-journey="journey"
                  :stage="stage"
                  @add-company="true"
                />
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                <StageCompanyList
                  :stage="stage"
                  :journey-items="stageJourneyCompanyMap[stage.id] || []"
                  @click="(item) => viewJourneyItem(item)"
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ViewJourneyItemModal
    v-if="viewingJourneyItem"
    :journey="journey"
    :is-open="isOpenJourneyItemModal"
    :journey-item="viewingJourneyItem"
    @close="closeViewJourneyItem"
  />
</template>

<script setup lang="ts">
import { Journey } from 'shared/entities/journey.entity';
import { useGlobalStages } from '@/stores/useGlobalStages';
import StageCompanyList from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyList.vue';
import ViewStageDescription from '@/screens/InterviewJourneyView/components/JourneyView/ViewStageDescription.vue';
import { useJourneyItems } from '@/screens/InterviewJourneyView/composables/useJourneyItems';
import ViewJourneyItemModal from '@/screens/InterviewJourneyView/components/ActionModals/ViewJourneyItemModal.vue';
import { useViewJourneyItemModal } from '@/screens/InterviewJourneyView/composables/useViewJourneyItemModal';

type JourneyViewProps = {
  journey: Journey;
};

const props = defineProps<JourneyViewProps>();

const { archivedStages } = useGlobalStages();

// Table Data
const { stageJourneyCompanyMap, retrieveAll: refreshJourneyItems } =
  useJourneyItems(props.journey);

// View Journey Item Feature
const {
  isOpen: isOpenJourneyItemModal,
  viewJourneyItem,
  closeViewJourneyItem,
  viewingJourneyItem,
} = useViewJourneyItemModal();
</script>
