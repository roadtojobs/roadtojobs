<template>
  <div class="hidden md:block">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table
          class="min-w-full divide-y divide-gray-300"
          :key="tableKey"
        >
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
                class="whitespace-nowrap py-6 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0"
              >
                <ViewStageDescription
                  :interview-journey="interviewJourney"
                  :stage="stage"
                  @add-company="onClickAddCompany"
                />
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                <StageCompanyList
                  :stage="stage"
                  :journey-company-items="
                    stageJourneyCompanyMap[stage.id] || []
                  "
                  @click="(item) => viewJourneyItem(item)"
                  @added="updateJourneyItemStage"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <AddJourneyItemModal
    v-if="addCompanyStage"
    :is-open="isShowAddCompanyModal"
    :stage="addCompanyStage"
    @close="onCloseAddCompany"
    @created="onCreatedJourneyItem"
  />
  <ViewJourneyItemModal
    v-if="viewingJourneyItem"
    :journey="interviewJourney"
    :is-open="isOpenJourneyItemModal"
    :interview-journey-company="viewingJourneyItem"
    @close="closeViewJourneyItem"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ViewStageDescription from '@/screens/InterviewJourneyView/components/JourneyView/ViewStageDescription.vue';
import { User } from 'shared/entities/user.entity';
import AddJourneyItemModal from '@/screens/InterviewJourneyView/components/ActionModals/AddJourneyItemModal.vue';
import StageCompanyList from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyList.vue';
import { useViewInterviewJourneyCompany } from '@/screens/InterviewJourneyView/composables/useViewInterviewJourneyCompany';
import ViewJourneyItemModal from '@/screens/InterviewJourneyView/components/ActionModals/ViewJourneyItemModal.vue';
import { useJourneyItems } from '@/screens/InterviewJourneyView/composables/useJourneyItems';
import { useGlobalStages } from '@/stores/useGlobalStages';
import { useJourneyItemsStageChange } from '@/screens/InterviewJourneyView/composables/useJourneyItemsStageChange';
import { useAddCompany } from '@/screens/InterviewJourneyView/composables/useAddCompany';
import { Journey } from 'shared/entities/journey.entity';

type InfoViewProps = {
  interviewJourney: Journey;
  user: User;
};

const props = defineProps<InfoViewProps>();

const tableKey = ref(`table-key-${Math.random()}`);
const rerenderTable = () => (tableKey.value = `table-key-${Math.random()}`);

const globalStages = useGlobalStages();
const stages = computed(() => globalStages.stages);

// Table Data
const { stageJourneyCompanyMap, retrieveAll: refreshJourneyItems } =
  useJourneyItems(props.interviewJourney);

// Add Company Feature
const {
  isShowAddCompanyModal,
  addCompanyStage,
  onCloseAddCompany,
  onClickAddCompany,
  onCreatedJourneyItem,
} = useAddCompany(async () => {
  await refreshJourneyItems().then(rerenderTable);
});

// View Journey Item Feature
const {
  isOpen: isOpenJourneyItemModal,
  viewJourneyItem,
  closeViewJourneyItem,
  interviewJourneyCompany: viewingJourneyItem,
} = useViewInterviewJourneyCompany();

// Sortable
const { updateJourneyItemStage } = useJourneyItemsStageChange(
  rerenderTable,
  refreshJourneyItems
);
</script>
