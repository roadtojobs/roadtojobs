<template>
  <div v-if="canFinalize">
    <Button
      :is-loading="finalizeState === 'loading'"
      :type="finalizeStateType"
      :icon="CheckBadgeIcon"
      @click="openModal"
    >
      Finalize Journey
    </Button>
    <Modal
      v-if="isOpenModal"
      title="Finalize the Journey"
      width-size="xl"
      :is-open="isOpenModal"
      @close="closeModal"
    >
      <div class="my-4 flex flex-col gap-3">
        <div
          v-if="finalizeState === 'has-offer'"
          class="text-sm prose text-black leading-6"
        >
          <p>Congrats on the offer and the new job, you made it 🥰!</p>
          <p>
            You can mark this Journey as ended to close the chapter! Then focus
            100% on your next Company 💪 We wish you all the bests!
          </p>
        </div>
        <div
          v-else
          class="text-sm prose text-black leading-6"
        >
          <p>
            Are you sure you want to mark this Journey as ended? You haven't
            still accepted any offer just yet 🥹
          </p>
          <p>
            Ultimately, it is your choice and you can still proceed the action!
            All the bests to you! ❤️️
          </p>
        </div>
        <div class="text-sm prose text-black leading-6">
          <p>After marked the Journey as Ended, the expected behaviour:</p>
          <ul>
            <li>❌ Everything is <strong>ReadOnly</strong>.</li>
            <li>✅ You can view the Journey and the items anytime.</li>
            <li>✅ You can add comment on the Journey Items.</li>
            <li>✅ The Journey always show up in the Active Journeys List.</li>
          </ul>
        </div>
        <div>
          <Textarea
            v-model="endedNote"
            label="Journey Ended Note (Optional)"
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
          @click="onSubmitFinalize"
        >
          Finalize
        </Button>
        <Button
          type="secondary"
          :is-loading="isLoading"
          @click="closeModal"
        >
          Close
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { Journey } from 'shared';
import { computed } from 'vue';
import { journeyItemRepo } from '@/repositories/journeyItem.repo';
import Modal from '@/components/Modal/Modal.vue';
import Input from '@/components/Input/Input.vue';
import { ref } from 'vue';
import { useLoading } from '@/composable/useLoading';
import Textarea from '@/components/Textarea/Textarea.vue';
import { journeyRepo } from '@/repositories/journey.repo';
import { notify } from '@kyvg/vue3-notification';

type FinalizeJourneyButtonProps = {
  journey: Journey;
};

type FinalizeJourneyButtonEmits = {
  (e: 'ended', journey: Journey): void;
};

const props = defineProps<FinalizeJourneyButtonProps>();
const emits = defineEmits<FinalizeJourneyButtonEmits>();

const finalizeState = ref<'loading' | 'has-offer' | 'none'>('loading');
const isOpenModal = ref(false);
const { isLoading, startLoading, stopLoading } = useLoading();

const confirmInputLabel = `Please enter "yes" to confirm`;
const confirmationText = ref({
  text: '',
  error: '',
});
const endedNote = ref('');

const canFinalize = computed(
  () => !props.journey.archivedAt && !props.journey.endedAt
);
const finalizeStateType = computed(() => {
  switch (finalizeState.value) {
    case 'loading':
      return 'neutral';
    case 'has-offer':
      return 'success';
    case 'none':
      return 'warning';
  }
});

const openModal = () => {
  confirmationText.value.error = '';
  isOpenModal.value = true;
};

const closeModal = () => {
  isOpenModal.value = false;
};

const onSubmitFinalize = async () => {
  confirmationText.value.error = '';

  if (confirmationText.value.text !== 'yes') {
    confirmationText.value.error =
      'Confirmation text does not match the requirement';

    return;
  }

  startLoading();
  const endedResult = await journeyRepo.end(props.journey.id, endedNote.value);
  stopLoading();

  if (!endedResult) {
    return notify({
      type: 'error',
      title: 'Mark as Ended Error',
      text: 'There was an error while marking your journey as ended. Please try again.',
    });
  }

  closeModal();
  emits('ended', endedResult);

  return notify({
    type: 'success',
    title: 'Successfully',
    text: 'Your journey has been marked as Ended!',
  });
};

onMounted(async () => {
  if (!canFinalize.value) {
    return;
  }

  const offeredItems = await journeyItemRepo.getOfferedItemsOfJourney(
    props.journey.id
  );

  finalizeState.value = offeredItems.length ? 'has-offer' : 'none';
});
</script>
