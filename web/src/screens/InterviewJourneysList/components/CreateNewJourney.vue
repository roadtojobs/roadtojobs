<template>
  <Button :icon="PlusIcon" @click="onClickCreate"> Create new Journey </Button>
  <Modal
    :is-open="isOpen"
    title="Create new Interview Journey"
    width-size="2xl"
    @close="isOpen = false"
  >
    <form @submit.prevent class="my-4 flex flex-col gap-3">
      <Input
        v-model="interviewJourney.name"
        id="journey_name"
        label="Journey Name"
      />
      <Textarea
        v-model="interviewJourney.description"
        label="Description"
        rows="4"
      />
      <Input v-model="startDateComputed" type="date" label="Start Date" />
      <Textarea
        v-model="interviewJourney.note"
        label="Personal Goal/Note (Optional)"
        rows="4"
      />
    </form>
    <template #bottom-buttons class="gap-2">
      <Button @click="onClickSubmit">Create</Button>
      <Button type="secondary" @click="onClickCloseModal">Cancel</Button>
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
  CreateInterviewJourney,
} from '@/screens/InterviewJourneysList/InterviewJourneysList.methods';
import Textarea from '@/components/Textarea/Textarea.vue';
import dayjs from 'dayjs';
import { SERVER_DATE_FORMAT } from '@/constants';

const isOpen = ref<boolean>(false);

const interviewJourney = ref<CreateInterviewJourney>(
  createBlankInterviewJourney()
);

const startDateComputed = computed({
  get() {
    return dayjs(interviewJourney.value.startDate).format(SERVER_DATE_FORMAT);
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
  interviewJourney.value = { ...createBlankInterviewJourney() };
};

const onClickSubmit = () => console.log(interviewJourney.value);
</script>
