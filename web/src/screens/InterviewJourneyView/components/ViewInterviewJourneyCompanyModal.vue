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
import Modal from '@/components/Modal/Modal.vue';
import { computed } from 'vue';
import Button from '@/components/Button/Button.vue';
import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';

type ViewCompanyModalProps = {
  interviewJourneyCompany: InterviewJourneyCompany;
  isOpen: boolean;
};

const props = defineProps<ViewCompanyModalProps>();

defineEmits<{
  (e: 'close'): void;
}>();

const modalTitle = computed(() => `Company: a`);
</script>
