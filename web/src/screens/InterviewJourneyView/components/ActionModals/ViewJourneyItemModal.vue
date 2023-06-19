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
                :journey-item="interviewJourneyCompany"
                :is-editing="isEdit"
                @click-edit="onClickEdit"
                @click-cancel="onClickCancel"
              />
              <JourneyDetailMobileView
                :journey="journey"
                :journey-item="interviewJourneyCompany"
                :total-activities="journeyActivities.length"
              />
              <JourneyItemDescription
                v-model="editForm.description"
                :journey-item="interviewJourneyCompany"
                :is-editing="isEdit"
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
                    :journey-item="interviewJourneyCompany"
                    @created-note="onActivityCreated"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <JourneyDetailDesktopView
          v-model:color-value="editForm.color"
          :journey="journey"
          :journey-item="interviewJourneyCompany"
          :total-activities="journeyActivities.length"
          :is-editing="isEdit"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import { onMounted } from 'vue';
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { journeyItemActivityRepo } from '@/repositories/journeyItemActivity.repo';
import ActivityList from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/ActivityList.vue';
import { JourneyItemActivity } from 'shared/entities/journeyItemActivity.entity';
import { Journey } from 'shared/entities/journey.entity';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent.vue';
import JourneyItemHeader from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/JourneyItemHeader.vue';
import JourneyDetailMobileView from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/JourneyDetailMobileView.vue';
import JourneyDetailDesktopView from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/JourneyDetailDesktopView.vue';
import JourneyItemDescription from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/EditModes/JourneyItemDescription.vue';
import { useEditJourneyItem } from '@/screens/InterviewJourneyView/composables/useEditJourneyItem';

type ViewCompanyModalProps = {
  journey: Journey;
  interviewJourneyCompany: JourneyItem;
  isOpen: boolean;
};

type ViewCompanyModalEmits = {
  (e: 'close'): void;
};

const props = defineProps<ViewCompanyModalProps>();
const emits = defineEmits<ViewCompanyModalEmits>();

const journeyActivities = ref<JourneyItemActivity[]>([]);

const loadAllActivities = async () => {
  const activities = await journeyItemActivityRepo.getByJourneyCompany(
    props.interviewJourneyCompany.id
  );

  journeyActivities.value = [...activities];
};

onMounted(async () => {
  await loadAllActivities();
});

const onActivityCreated = () => loadAllActivities();

const { isEdit, onClickEdit, editForm, onClickCancel } = useEditJourneyItem(
  props.interviewJourneyCompany
);
</script>
