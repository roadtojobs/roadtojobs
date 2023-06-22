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
            <li>✅ You can add comment on the Journey Item.</li>
            <li>✅ The Journey always show up in the Active Journeys List.</li>
          </ul>
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
          :is-loading="true"
          @click="true"
        >
          Finalize
        </Button>
        <Button
          type="secondary"
          :is-loading="true"
          @click="true"
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

type FinalizeJourneyButtonProps = {
  journey: Journey;
};

const props = defineProps<FinalizeJourneyButtonProps>();
const finalizeState = ref<'loading' | 'has-offer' | 'none'>('loading');
const isOpenModal = ref(false);
const confirmInputLabel = `Please enter "yes" to confirm`;
const confirmationText = ref({
  text: '',
  error: '',
});

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
  isOpenModal.value = true;
};

const closeModal = () => {
  isOpenModal.value = false;
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
