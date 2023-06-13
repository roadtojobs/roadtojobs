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
                <ViewStageDescription
                  :stage="stage"
                  @add-company="onClickAddCompany"
                />
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                <StageCompanyList
                  v-if="stageJourneyCompanyMap[stage.id]"
                  :stage="stage"
                  :journey-company-items="stageJourneyCompanyMap[stage.id]"
                  @click="(item) => viewJourneyItem(item)"
                />
                <span v-else> No company here 👀 </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <AddCompanyModal
    v-if="addCompanyStage"
    :is-open="isShowAddCompanyModal"
    :stage="addCompanyStage"
    @close="onCloseAddCompany"
  />
  <ViewInterviewJourneyCompanyModal
    v-if="viewingJourneyItem"
    :is-open="isOpenJourneyItemModal"
    :interview-journey-company="viewingJourneyItem"
    @close="closeViewJourneyItem"
  />
</template>

<script setup lang="ts">
import { InterviewJourney } from '@/repositories/interviewJourney.repo';
import { computed, onMounted } from 'vue';
import { Stage, stageRepo } from '@/repositories/stage.repo';
import ViewStageDescription from '@/screens/InterviewJourneyView/components/ViewStageDescription.vue';
import { User } from '@/repositories/user.repo';
import AddCompanyModal from '@/screens/InterviewJourneyView/components/AddCompanyModal.vue';
import {
  InterviewJourneyCompany,
  interviewJourneyCompanyRepo,
} from '@/repositories/interviewJourneyCompany.repo';
import StageCompanyList from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyList.vue';
import { useViewInterviewJourneyCompany } from '@/screens/InterviewJourneyView/composables/useViewInterviewJourneyCompany';
import ViewInterviewJourneyCompanyModal from '@/screens/InterviewJourneyView/components/ViewInterviewJourneyCompanyModal.vue';

type InfoViewProps = {
  interviewJourney: InterviewJourney;
  user: User;
};

const props = defineProps<InfoViewProps>();

const stages = ref<Stage[]>([]);
const interviewJourneyCompanyItems = ref<InterviewJourneyCompany[]>([]);

const addCompanyStage = ref<Stage | null>(null);
const isShowAddCompanyModal = ref(false);

const {
  isOpen: isOpenJourneyItemModal,
  viewJourneyItem,
  closeViewJourneyItem,
  interviewJourneyCompany: viewingJourneyItem,
} = useViewInterviewJourneyCompany();

onMounted(async () => {
  // get stages
  const remoteStages = await stageRepo.getAll();
  stages.value = [...remoteStages];

  // get companies of this user
  const journeyCompanyItems = await interviewJourneyCompanyRepo.getByJourney(
    props.interviewJourney.id
  );
  interviewJourneyCompanyItems.value = [...journeyCompanyItems];
});

const stageJourneyCompanyMap = computed(() => {
  return interviewJourneyCompanyItems.value.reduce<
    Record<string, InterviewJourneyCompany[]>
  >((record, journeyCompany) => {
    record[journeyCompany.stageId] ??= [];
    record[journeyCompany.stageId].push(journeyCompany);

    return record;
  }, {});
});

const onClickAddCompany = (stage: Stage) => {
  addCompanyStage.value = { ...stage };
  isShowAddCompanyModal.value = true;
};

const onCloseAddCompany = () => {
  addCompanyStage.value = null;
  isShowAddCompanyModal.value = false;
};
</script>
