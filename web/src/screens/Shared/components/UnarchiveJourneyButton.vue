<template>
  <Button
    type="neutral"
    :is-loading="isLoading"
    @click="openConfirmationModal"
  >
    {{ label || 'Recover' }}
  </Button>
  <Modal
    v-if="isOpen"
    title="Recover Confirmation"
    width-size="xl"
    :is-open="isOpen"
    @close="closeConfirmationModal"
  >
    <div class="my-4 flex flex-col gap-3">
      <div class="text-sm prose text-black">
        <p>
          Are you sure you want to recover / unarchive the
          <strong>
            {{ journey.name }}
          </strong>
          ?
          <br />
        </p>

        <p>
          Everything will get back to normal after you unarchive this journey.
          Small note: the archived reason will be cleared.
        </p>
      </div>
      <div>
        <Input
          v-model="confirmationText.text"
          :label="confirmInputLabel"
          :error="confirmationText.error"
        />
      </div>
    </div>
    <template #bottom-buttons>
      <Button
        :is-loading="isLoading"
        @click="onSubmitUnarchive"
      >
        Submit
      </Button>
      <Button
        type="secondary"
        :is-loading="isLoading"
        @click="closeConfirmationModal"
      >
        Close
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue';
import { Journey } from 'shared/entities/journey.entity';
import Modal from '@/components/Modal/Modal.vue';
import { ref } from 'vue';
import Input from '@/components/Input/Input.vue';
import { journeyRepo } from '@/repositories/journey.repo';
import { notify } from '@kyvg/vue3-notification';
import { useLoading } from '@/composable/useLoading';

type UnarchiveJourneyButtonProps = {
  label?: string;
  journey: Journey;
};

type UnarchiveJourneyButtonEmits = {
  (e: 'unarchived', journey: Journey): void;
};

const props = defineProps<UnarchiveJourneyButtonProps>();
const emits = defineEmits<UnarchiveJourneyButtonEmits>();

const { isLoading, startLoading, stopLoading } = useLoading();

const isOpen = ref(false);
const confirmationText = ref({
  text: '',
  error: '',
});

const confirmInputLabel = `Please enter "yes" to confirm`;

const openConfirmationModal = () => {
  confirmationText.value.error = '';
  confirmationText.value.text = '';

  isOpen.value = true;
};

const closeConfirmationModal = () => {
  isOpen.value = false;
};

const onSubmitUnarchive = async () => {
  confirmationText.value.error = '';

  if (confirmationText.value.text !== 'yes') {
    confirmationText.value.error =
      'Confirmation text does not match the requirement';

    return;
  }

  startLoading();
  const result = await journeyRepo.unarchive(props.journey.id);
  stopLoading();

  if (!result) {
    return notify({
      type: 'error',
      title: 'Archive Error',
      text: 'There was an error while recovering your journey. Please try again.',
    });
  }

  closeConfirmationModal();
  emits('unarchived', result);

  return notify({
    type: 'success',
    title: 'Recovered',
    text: 'Journey has been recovered! You can interact with your journey again.',
  });
};
</script>
