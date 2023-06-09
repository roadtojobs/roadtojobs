<template>
  <Button :icon="PlusIcon" @click="onClickCreate"> Create new Journey </Button>
  <Modal
    :is-open="isOpen"
    title="Create new Interview Journey"
    width-size="2xl"
    @close="isOpen = false"
  >
    <form @submit.prevent class="my-4 flex flex-col gap-3">
      <Input id="journey_name" label="Journey Name" />
      <Textarea id="journey_name" label="Description" rows="4" />
    </form>
    <template #bottom-buttons class="gap-2">
      <Button>Create</Button>
      <Button type="secondary" @click="onClickCloseModal">Cancel</Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
import Button from '@/components/Button/Button.vue';
import Modal from '@/components/Modal/Modal.vue';
import { ref } from 'vue';
import Input from '@/components/Input/Input.vue';
import {
  createBlankInterviewJourney,
  CreateInterviewJourney,
} from '@/screens/InterviewJourneysList/InterviewJourneysList.methods';
import Textarea from '@/components/Textarea/Textarea.vue';

const isOpen = ref<boolean>(false);

const interviewJourney = ref<CreateInterviewJourney>(
  createBlankInterviewJourney()
);

const onClickCreate = () => {
  isOpen.value = true;

  setTimeout(() => {
    document.getElementById('journey_name')?.focus();
  }, 100);
};
const onClickCloseModal = () => {
  isOpen.value = false;
  interviewJourney.value = { ...createBlankInterviewJourney() };
};
</script>
