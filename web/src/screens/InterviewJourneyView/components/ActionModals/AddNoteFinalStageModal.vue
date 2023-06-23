<template>
  <Modal
    title="Final Stage Information"
    width-size="xl"
    :is-open="true"
    :wants-close-on-click-outside="false"
    hide-top-close-button
    @close="true"
  >
    <div class="my-4 flex flex-col gap-3">
      <div class="text-sm prose text-black">
        <p v-if="stage.isGoodStage">
          Congrats to moving forward to the
          <strong>{{ stage.name }}</strong> stage 🥳! You rock!
        </p>
        <p v-else-if="stage.isBadStage">
          It is too bad that you arrived to the
          <strong>{{ stage.name }}</strong> stage 😥!
        </p>
        <p>Let's add some notes for your future references 😉</p>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import { Stage, JourneyItem } from 'shared';

type AddNoteFinalStageModalProps = {
  isOpen: boolean;
  journeyItem: JourneyItem;
  stage: Stage;
};

type AddNoteFinalStageModalEmits = {
  (e: 'close'): void;
};

const props = defineProps<AddNoteFinalStageModalProps>();
const emits = defineEmits<AddNoteFinalStageModalEmits>();
</script>
