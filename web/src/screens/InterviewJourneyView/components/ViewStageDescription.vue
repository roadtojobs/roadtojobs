<template>
  <div class="flex view-stage-container">
    <a
      href="javascript:void(0)"
      @click="isOpen = true"
      class="flex-1"
    >
      {{ stage.name }}
    </a>
    <span
      class="add-company hidden"
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
import { Stage } from '@/repositories/stage.repo';
import Button from '@/components/Button/Button.vue';
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';

type ViewStageDescriptionProps = {
  stage: Stage;
};

defineProps<ViewStageDescriptionProps>();

defineEmits<{
  (e: 'add-company', stage: Stage): void;
}>();

const isOpen = ref(false);
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
