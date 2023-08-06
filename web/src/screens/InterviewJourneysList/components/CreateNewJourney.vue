<template>
  <Button
    :icon="PlusIcon"
    @click="onClickCreate"
  >
    Create new Journey
  </Button>
  <Modal
    :is-open="isOpen"
    title="Create new Interview Journey"
    width-size="2xl"
    @close="onClickCloseModal"
  >
    <form
      class="my-4 flex flex-col gap-3"
      @submit.prevent
    >
      <Input
        id="journey_name"
        v-model="interviewJourney.name"
        label="Journey Name"
        placeholder="Put a lovely name for a big inspiration"
        :error="errorsBag.get('name')"
      />
      <MarkdownEditor
        v-model="interviewJourney.description"
        id="journey_description"
        label="Journey Description"
        placeholder="Give the journey some details."
        :error="errorsBag.get('description')"
      />
      <Input
        v-model="startDateComputed"
        id="journey_date"
        type="date"
        label="Journey Start Date"
        :error="errorsBag.get('startDate')"
      />
      <MarkdownEditor
        v-model="interviewJourney.note"
        id="journey_goal"
        label="Personal Goal/Note (Optional)"
        placeholder="Always a good idea to note down the desired goals, notes."
      />
    </form>
    <template #bottom-buttons>
      <Button
        id="create-journey-submit"
        @click="onClickSubmit"
      >
        Create
      </Button>
      <Button
        type="secondary"
        @click="onClickCloseModal"
      >
        Cancel
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
import Button from '@/components/Button/Button.vue';
import Modal from '@/components/Modal/Modal.vue';
import { computed, ref } from 'vue';
import Input from '@/components/Input/Input.vue';
import {
  createBlankInterviewJourney,
  createInterviewJourney,
  CreateInterviewJourney,
} from '@/screens/InterviewJourneysList/InterviewJourneysList.methods';
import useValidation from '@/composable/useValidation';
import { journeyRepo } from '@/repositories/journey.repo';
import { useCurrentUser } from '@/stores/useCurrentUser';
import { useRouter } from 'vue-router';
import { pickThingId } from '@/utils/surrealThing';
import { notify } from '@kyvg/vue3-notification';
import { getServerDateNow } from '@/utils/date';
import MarkdownEditor from '@/components/MarkdownEditor/MarkdownEditor.vue';

const currentUser = useCurrentUser();
const router = useRouter();

const {
  validate,
  errorsBag,
  reset: resetErrors,
} = useValidation<CreateInterviewJourney>(createInterviewJourney);

const isOpen = ref<boolean>(false);

const interviewJourney = ref<CreateInterviewJourney>(
  createBlankInterviewJourney()
);

const startDateComputed = computed({
  get() {
    return getServerDateNow();
  },
  set(value: string) {
    const date = new Date(value);
    if (date.getFullYear() === 1970) {
      return;
    }

    interviewJourney.value.startDate = date;
  },
});

const onClickCreate = () => {
  isOpen.value = true;

  setTimeout(() => {
    document.getElementById('journey_name')?.focus();
  }, 100);
};

const onClickCloseModal = () => {
  isOpen.value = false;
  resetErrors();
  interviewJourney.value = { ...createBlankInterviewJourney() };
};

const onClickSubmit = async () => {
  const validationResult = validate({
    ...interviewJourney.value,
    user: currentUser.userId,
  });

  if (!validationResult.success) {
    return notify({
      type: 'error',
      title: 'Validation Error',
      text: 'Please check the error(s), fix and try again.',
    });
  }

  const createdId = await journeyRepo.create(validationResult.parsedObject);

  if (!createdId) {
    return notify({
      type: 'error',
      title: 'Creation Error',
      text: 'There was an error while creating a new Journey. Please try again.',
    });
  }

  router.push({
    name: 'interview-journey-view',
    params: {
      id: pickThingId(createdId),
    },
  });
};
</script>
