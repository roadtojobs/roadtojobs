<template>
  <div>
    <div class="mt-2">
      <dl class="divide-y divide-gray-100">
        <div
          v-for="item in renderItems"
          :key="`${item.key}-show`"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm font-medium leading-6 text-gray-900">
            {{ item.label }}
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <component
              v-if="!isEditing || !item.EditComponent"
              :is="item.Text"
            />
            <component
              v-else
              :is="item.EditComponent"
            />
          </dd>
        </div>
      </dl>
    </div>
    <div
      class="mt-2 border-t border-t-gray-100 pt-4 flex justify-between items-center gap-x-2"
    >
      <div
        v-if="!isEditing"
        class="flex gap-2"
      >
        <!-- View -->
        <Button
          v-if="isAbleToEdit"
          @click="onClickEdit"
        >
          Edit
        </Button>
        <Button
          type="secondary"
          @click="$router.push({ name: 'interview-journey' })"
        >
          Back
        </Button>
      </div>
      <div
        v-else
        class="flex gap-2"
      >
        <!-- Editing -->
        <Button
          v-if="isEditing"
          @click="onSubmitEdit"
          :is-loading="isLoading"
        >
          Submit
        </Button>
        <Button
          v-if="isEditing"
          type="secondary"
          @click="isEditing = false"
          :is-loading="isLoading"
        >
          Cancel
        </Button>
      </div>
      <!-- Archive -->
      <ArchiveJourneyButton
        v-if="isAbleToArchive"
        :journey="interviewJourney"
        @archived="onArchivedJourney"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from '@/components/Button/Button.vue';
import { Journey } from 'shared/entities/journey.entity';
import { journeyRepo, UpdateJourney } from '@/repositories/journey.repo';
import useValidation from '@/composable/useValidation';
import { updateJourney } from '@/screens/InterviewJourneyView/components/InfoView.methods';
import { notify } from '@kyvg/vue3-notification';
import { useCurrentJourney } from '@/stores/useCurrentJourney';
import { useLoading } from '@/composable/useLoading';
import ArchiveJourneyButton from '@/screens/Shared/components/ArchiveJourneyButton.vue';
import { useInfoViewRenderItems } from '@/screens/InterviewJourneyView/composables/useInfoViewRenderItems';

type InfoViewProps = {
  interviewJourney: Journey;
};

const props = defineProps<InfoViewProps>();

const journey = computed(() => props.interviewJourney);

const isEditing = ref(false);
const editForm = ref<UpdateJourney>({
  name: '',
  description: '',
  note: '',
  startedAt: new Date(),
});
const { errorsBag, validate, reset } =
  useValidation<UpdateJourney>(updateJourney);
const { mergePartial: updateJourneyPartially } = useCurrentJourney();
const { isLoading, startLoading, stopLoading } = useLoading();

const isAbleToEdit = computed(
  () => !journey.value.archivedAt && !journey.value.endedAt
);
const isAbleToArchive = computed(() => !journey.value.archivedAt);

const onClickEdit = () => {
  editForm.value = {
    name: props.interviewJourney.name,
    description: props.interviewJourney.description,
    note: props.interviewJourney.note || '',
    startedAt: props.interviewJourney.startedAt,
  };

  isEditing.value = true;
};

const onSubmitEdit = async () => {
  reset();
  const validateResult = validate({
    ...editForm.value,
  });

  if (!validateResult.success) {
    return notify({
      type: 'error',
      title: 'Validation Error',
      text: 'Please check the error(s), fix and try again.',
    });
  }

  // update
  startLoading();
  const updateResult = await journeyRepo.update(
    props.interviewJourney.id,
    validateResult.parsedObject
  );
  stopLoading();

  if (!updateResult) {
    return notify({
      type: 'error',
      title: 'Update Error',
      text: 'There was an error while updating your Journey. Please refresh the page and try again.',
    });
  }

  updateJourneyPartially(updateResult);
  isEditing.value = false;

  return notify({
    type: 'success',
    title: 'Updated',
    text: 'Your journey was updated successfully!',
  });
};

const onArchivedJourney = (journey: Journey) => {
  updateJourneyPartially(journey);
};

const { renderItems } = useInfoViewRenderItems({
  journey,
  editForm,
  errorsBag,
  onFinalizedJourney: onArchivedJourney,
});
</script>
