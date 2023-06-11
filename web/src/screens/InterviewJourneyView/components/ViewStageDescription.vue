<template>
  <div>
    <a
      href="javascript:void(0)"
      @click="isOpen = true"
    >
      {{ stage.name }}
    </a>
  </div>
  <Modal
    :title="`Stage: ${stage.name}`"
    :is-open="isOpen"
    width-size="lg"
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
        >Close</Button
      >
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import { Stage } from '@/repositories/stage.repo';
import Button from '@/components/Button/Button.vue';
import { ref } from 'vue';

type ViewStageDescriptionProps = {
  stage: Stage;
};

defineProps<ViewStageDescriptionProps>();

const isOpen = ref(false);
</script>
