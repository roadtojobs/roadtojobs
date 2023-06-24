<template>
  <Modal
    :is-open="isOpen"
    @close="$emit('close')"
    width-size="5xl"
  >
    <div class="flex-1 overflow-y-auto">
      <div class="xl:grid xl:max-w-5xl xl:grid-cols-3">
        <div class="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
          <div>
            <div>
              <JourneyItemHeader
                :journey="journey"
                :journey-item="journeyItem"
                :is-editing="isEdit"
                @click-edit="onClickEdit"
                @click-cancel="onClickCancel"
                @click-save="onSaveEditing"
              />
              <JourneyDetailMobileView
                v-model:stage-value="editForm.stageId"
                :journey="journey"
                :journey-item="journeyItem"
                :total-activities="journeyActivities.length"
                :is-editing="isEdit"
              />
              <JourneyItemDescription
                v-model="editForm.description"
                :journey-item="journeyItem"
                :is-editing="isEdit"
                :error="editJourneyItemErrors.get('description')"
              />
            </div>
          </div>
          <section
            aria-labelledby="activity-title"
            class="mt-8 xl:mt-10"
          >
            <div>
              <div class="divide-y divide-gray-200">
                <div class="pb-4">
                  <h2
                    id="activity-title"
                    class="text-lg font-medium text-gray-900"
                  >
                    Activity Stream
                  </h2>
                </div>
                <div class="pt-6">
                  <ActivityList
                    :activities="journeyActivities"
                    :journey-item="journeyItem"
                    @created-note="onActivityCreated"
                    @created-note-with-archived="onActivityCreatedWithArchived"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <JourneyDetailDesktopView
          v-model:stage-value="editForm.stageId"
          v-model:color-value="editForm.color"
          v-model:attributes-value="editForm.attributes"
          :journey="journey"
          :journey-item="journeyItem"
          :total-activities="journeyActivities.length"
          :is-editing="isEdit"
        />
      </div>
    </div>
    <AddNoteFinalStageModal
      v-if="isOpenFinalStageNoteModal && finalNoteStage && finalNoteJourneyItem"
      :is-open="isOpenFinalStageNoteModal"
      :stage="finalNoteStage"
      :journey-item="finalNoteJourneyItem"
      @added-note="addedCompanyNote"
    />
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import { onMounted } from 'vue';
import { journeyItemActivityRepo } from '@/repositories/journeyItemActivity.repo';
import ActivityList from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/ActivityList.vue';
import { JourneyItemActivity } from 'shared/entities/journeyItemActivity.entity';
import { Journey } from 'shared/entities/journey.entity';
import JourneyItemHeader from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/JourneyItemHeader.vue';
import JourneyDetailMobileView from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/JourneyDetailMobileView.vue';
import JourneyDetailDesktopView from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/JourneyDetailDesktopView.vue';
import JourneyItemDescription from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/EditModes/JourneyItemDescription.vue';
import {
  EditJourneyItem,
  useEditJourneyItem,
} from '@/screens/InterviewJourneyView/composables/useEditJourneyItem';
import { StrictJourneyItem } from '@/screens/InterviewJourneyView/composables/useViewJourneyItemModal';
import { useFinalStageNote } from '@/screens/InterviewJourneyView/composables/useFinalStageNote';
import AddNoteFinalStageModal from '@/screens/InterviewJourneyView/components/ActionModals/AddNoteFinalStageModal.vue';
import { useGlobalStages } from '@/stores/useGlobalStages';

type ViewCompanyModalProps = {
  journey: Journey;
  journeyItem: StrictJourneyItem;
  isOpen: boolean;
};

type ViewCompanyModalEmits = {
  (e: 'close'): void;
  (e: 'journey-item-updated', id: string, values: EditJourneyItem): void;
  (e: 'journey-item-archived', id: string, stageId: string): void;
};

const props = defineProps<ViewCompanyModalProps>();
const emits = defineEmits<ViewCompanyModalEmits>();

const { finalStages } = useGlobalStages();

// Add note for final stage
const {
  isOpenFinalStageNoteModal,
  openFinalStageNoteModal,
  finalNoteStage,
  finalNoteJourneyItem,
  addedCompanyNote,
} = useFinalStageNote({ journeyItems: ref([props.journeyItem]) });

const journeyActivities = ref<JourneyItemActivity[]>([]);

const loadAllActivities = async () => {
  const activities = await journeyItemActivityRepo.getByJourneyCompany(
    props.journeyItem.id
  );

  journeyActivities.value = [...activities];
};

onMounted(loadAllActivities);

const onActivityCreated = () => loadAllActivities();

const onActivityCreatedWithArchived = (stageId: string) => {
  emits('journey-item-archived', props.journeyItem.id, stageId);
  loadAllActivities();
};

const onUpdatedJourneyItem = (updatedValues: EditJourneyItem) => {
  const updatedStageId = updatedValues.stageId;
  const isMovingForwardToFinalStage =
    finalStages.some((stage) => stage.id === updatedStageId) &&
    props.journeyItem.stageId !== updatedStageId;

  if (isMovingForwardToFinalStage) {
    openFinalStageNoteModal({
      journeyItemId: props.journeyItem.id,
      wantedStageId: updatedValues.stageId,
    });
  }

  emits('journey-item-updated', props.journeyItem.id, updatedValues);
  loadAllActivities();
};

const {
  isEdit,
  onClickEdit,
  editForm,
  onClickCancel,
  onSaveEditing,
  editJourneyItemErrors,
} = useEditJourneyItem(props.journeyItem, onUpdatedJourneyItem);
</script>
