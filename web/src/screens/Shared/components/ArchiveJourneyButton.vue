<template>
  <Button
    type="warning"
    @click="openConfirmationModal"
    :is-loading="isLoading"
  >
    {{ label || 'Archive' }}
  </Button>
  <Modal
    v-if="isOpen"
    title="Archive Confirmation"
    width-size="xl"
    :is-open="isOpen"
    @close="closeConfirmationModal"
  >
    <div class="my-4 flex flex-col gap-3">
      <div class="text-sm prose">
        <p>
          Are you sure you want to archive the
          <strong>
            {{ journey.name }}
          </strong>
          ?
          <br />
        </p>

        <p>Expected behaviour after the Journey got archived:</p>

        <ul>
          <li>❌ Everything is <strong>ReadOnly</strong>.</li>
          <li>🥹 The Journey won't appear in the Active Journeys List.</li>
          <li>😥 You can't edit or interact with the Archived Journey.</li>
          <li>✅ You can view the Archived Journey normally.</li>
        </ul>
      </div>
      <div>
        <Textarea
          v-model="archiveNote"
          label="Archived Note (Optional)"
          placeholder="Always a good idea to note everything for future reference. Markdown supported!"
          rows="6"
        />
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
        @click="onSubmitArchive"
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
import Textarea from '@/components/Textarea/Textarea.vue';
import Input from '@/components/Input/Input.vue';
import { journeyRepo } from '@/repositories/journey.repo';
import { notify } from '@kyvg/vue3-notification';
import { useLoading } from '@/composable/useLoading';

type ArchiveJourneyButtonProps = {
  label?: string;
  journey: Journey;
};

type ArchiveJourneyButtonEmits = {
  (e: 'archived', journey: Journey): void;
};

const props = defineProps<ArchiveJourneyButtonProps>();
const emits = defineEmits<ArchiveJourneyButtonEmits>();

const { isLoading, startLoading, stopLoading } = useLoading();

const isOpen = ref(false);
const confirmationText = ref({
  text: '',
  error: '',
});

const archiveNote = ref('');

const confirmInputLabel = `Please enter "yes" to confirm`;

const openConfirmationModal = () => {
  archiveNote.value = '';
  confirmationText.value.error = '';

  isOpen.value = true;
};

const closeConfirmationModal = () => {
  isOpen.value = false;
};

const onSubmitArchive = async () => {
  confirmationText.value.error = '';

  if (confirmationText.value.text !== 'yes') {
    confirmationText.value.error =
      'Confirmation text does not match the requirement';

    return;
  }

  startLoading();
  const archiveResult = await journeyRepo.archive(
    props.journey.id,
    archiveNote.value
  );
  stopLoading();

  if (!archiveResult) {
    return notify({
      type: 'error',
      title: 'Archive Error',
      text: 'There was an error while archiving your journey. Please try again.',
    });
  }

  closeConfirmationModal();
  emits('archived', archiveResult);

  return notify({
    type: 'error',
    title: 'Archived',
    text: 'Journey archived!',
  });
};
</script>
