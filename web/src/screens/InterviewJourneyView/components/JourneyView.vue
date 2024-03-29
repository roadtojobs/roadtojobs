<template>
  <div>
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
                class="py-3.5 md:w-56 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 select-none"
              >
                Stage
              </th>
              <th
                scope="col"
                class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900 select-none"
              >
                Companies
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="stage in activeStages"
              :key="stage.id"
              class="divide-x divide-gray-200"
            >
              <td
                class="whitespace-nowrap md:w-56 py-6 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0"
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
                  :journey-items="stageJourneyCompanyMap[stage.id] || []"
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
  <FloatingAddJourneyItem
    v-if="!interviewJourney.archivedAt && !interviewJourney.endedAt"
    @add="() => onClickAddCompany(activeStages[0])"
  />
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
    :journey-item="viewingJourneyItem"
    @close="closeViewJourneyItem"
    @journey-item-updated="updateJourneyItem"
    @journey-item-archived="updateJourneyItemToArchived"
  />
  <AddNoteFinalStageModal
    v-if="isOpenFinalStageNoteModal && finalNoteStage && finalNoteJourneyItem"
    :is-open="isOpenFinalStageNoteModal"
    :stage="finalNoteStage"
    :journey-item="finalNoteJourneyItem"
    @added-note="addedCompanyNote"
  />
</template>

<script setup lang="ts">
import ViewStageDescription from '@/screens/InterviewJourneyView/components/JourneyView/ViewStageDescription.vue';
import AddJourneyItemModal from '@/screens/InterviewJourneyView/components/ActionModals/AddJourneyItemModal.vue';
import StageCompanyList from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyList.vue';
import { useViewJourneyItemModal } from '@/screens/InterviewJourneyView/composables/useViewJourneyItemModal';
import ViewJourneyItemModal from '@/screens/InterviewJourneyView/components/ActionModals/ViewJourneyItemModal.vue';
import { useJourneyItems } from '@/screens/InterviewJourneyView/composables/useJourneyItems';
import { useGlobalStages } from '@/stores/useGlobalStages';
import { useJourneyItemsStageChange } from '@/screens/InterviewJourneyView/composables/useJourneyItemsStageChange';
import { useAddCompany } from '@/screens/InterviewJourneyView/composables/useAddCompany';
import { Journey } from 'shared/entities/journey.entity';
import { useCurrentUser } from '@/stores/useCurrentUser';
import { computed } from 'vue';
import { useFinalStageNote } from '@/screens/InterviewJourneyView/composables/useFinalStageNote';
import AddNoteFinalStageModal from '@/screens/InterviewJourneyView/components/ActionModals/AddNoteFinalStageModal.vue';
import FloatingAddJourneyItem from '@/screens/InterviewJourneyView/components/FloatingAddJourneyItem/FloatingAddJourneyItem.vue';

type JourneyViewProps = {
  interviewJourney: Journey;
};

const props = defineProps<JourneyViewProps>();

const tableKey = ref(`table-key-${Math.random()}`);
const rerenderTable = () => (tableKey.value = `table-key-${Math.random()}`);

const currentUser = useCurrentUser();
const user = computed(() => currentUser.user);

const { activeStages } = useGlobalStages();

// Table Data
const {
  journeyItems,
  stageJourneyCompanyMap,
  retrieveAll: refreshJourneyItems,
  updateJourneyItem,
  updateJourneyItemStage: updateJourneyItemToArchived,
} = useJourneyItems(props.interviewJourney);

// Add Company Feature
const {
  isShowAddCompanyModal,
  addCompanyStage,
  onCloseAddCompany,
  onClickAddCompany,
  onCreatedJourneyItem,
} = useAddCompany(async (addedJourneyItem) => {
  await refreshJourneyItems().then(rerenderTable);
  openFinalStageNoteModal({
    journeyItemId: addedJourneyItem.journeyItemId,
    wantedStageId: addedJourneyItem.stageId,
  });
});

// View Journey Item Feature
const {
  isOpen: isOpenJourneyItemModal,
  viewJourneyItem,
  closeViewJourneyItem: closeViewJourneyItemModal,
  viewingJourneyItem,
} = useViewJourneyItemModal();

// Add note for final stage
const {
  isOpenFinalStageNoteModal,
  openFinalStageNoteModal,
  finalNoteStage,
  finalNoteJourneyItem,
  addedCompanyNote,
} = useFinalStageNote({ journeyItems });

// Sortable
const { updateJourneyItemStage } = useJourneyItemsStageChange(
  rerenderTable,
  refreshJourneyItems,
  openFinalStageNoteModal
);

// Note: it is a good idea to hard-refresh after close the viewing modal, cuz after the modal action
// there would be a lot of mutations and the data could go wild
// Future improvement: add a check (isDirty) to know the JourneyItem has been updated, so we'll update it on true
const closeViewJourneyItem = async () => {
  await refreshJourneyItems();
  closeViewJourneyItemModal();
};
</script>
