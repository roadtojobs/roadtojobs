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
      <div class="my-4">Hello world</div>
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

type FinalizeJourneyButtonProps = {
  journey: Journey;
};

const props = defineProps<FinalizeJourneyButtonProps>();
const finalizeState = ref<'loading' | 'has-offer' | 'none'>('loading');
const isOpenModal = ref(false);

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
