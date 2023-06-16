<template>
  <Modal
    :is-open="isOpen"
    @close="$emit('close')"
    :title="title"
  >
    <div class="text-sm"><slot /></div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';

type ConfirmationModalProps = {
  isOpen: boolean;
  title?: string;
};

type ConfirmationModalEmits = {
  (e: 'close'): void;
};

withDefaults(defineProps<ConfirmationModalProps>(), {
  isOpen: false,
  title: 'Confirm the Action',
});

defineEmits<ConfirmationModalEmits>();
</script>
