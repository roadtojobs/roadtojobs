<template>
  <div class="flex view-stage-container md:w-56">
    <a
      href="javascript:void(0)"
      @click="openModal"
      class="flex-1 select-none"
    >
      {{ stage.name }}
    </a>
    <span
      v-if="
        !interviewJourney.endedAt && !interviewJourney.archivedAt && isDesktop
      "
      class="add-company hidden select-none"
      @click="$emit('add-company', stage)"
    >
      <PlusIcon class="w-4 h-4" /> Add
    </span>
  </div>
  <Modal
    :title="`Stage: ${stage.name}`"
    :is-open="isOpen"
    width-size="lg"
    @close="isOpen = false"
  >
    <div class="py-4">
      <span
        class="text-sm leading-6"
        v-text="stage.description"
      />
    </div>
    <template #bottom-buttons>
      <Button
        type="secondary"
        @click="isOpen = false"
      >
        Close
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import { Stage } from 'shared/entities/stage.entity';
import Button from '@/components/Button/Button.vue';
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { Journey } from 'shared/entities/journey.entity';
import { useViewingMode } from '@/composable/useViewingMode';

type ViewStageDescriptionProps = {
  interviewJourney: Journey;
  stage: Stage;
};

type ViewStageDescriptionEmits = {
  (e: 'add-company', stage: Stage): void;
};

const props = defineProps<ViewStageDescriptionProps>();
const emits = defineEmits<ViewStageDescriptionEmits>();

const isOpen = ref(false);

const { isDesktop, isMobile } = useViewingMode();

const openModal = () => {
  if (
    isMobile.value &&
    !props.interviewJourney.endedAt &&
    !props.interviewJourney.archivedAt
  ) {
    return emits('add-company', props.stage);
  }

  isOpen.value = true;
};
</script>

<style>
.view-stage-container:hover .add-company {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
</style>
