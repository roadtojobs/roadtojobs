<template>
  <Modal
    :is-open="isOpen"
    :title="modalTitle"
    @close="$emit('close')"
    width-size="xl"
  >
    <div class="my-4">asdas</div>
    <template #bottom-buttons>
      <Button>Add</Button>
      <Button
        type="secondary"
        @click="$emit('close')"
      >
        Close
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Stage } from '@/repositories/stage.repo';
import Modal from '@/components/Modal/Modal.vue';
import { computed } from 'vue';
import Button from '@/components/Button/Button.vue';

type AddCompanyModalProps = {
  stage: Stage;
  isOpen: boolean;
};

const props = defineProps<AddCompanyModalProps>();

defineEmits<{
  (e: 'close'): void;
}>();

const modalTitle = computed(() => `Add Company at stage: ${props.stage.name}`);
</script>
