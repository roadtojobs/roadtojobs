<template>
  <Modal
    :is-open="isOpen"
    :title="modalTitle"
    @close="$emit('close')"
    width-size="5xl"
  >
    <div class="my-4">asdas</div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import { computed } from 'vue';
import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';

type ViewCompanyModalProps = {
  interviewJourneyCompany: InterviewJourneyCompany;
  isOpen: boolean;
};

const props = defineProps<ViewCompanyModalProps>();

defineEmits<{
  (e: 'close'): void;
}>();

const modalTitle = computed(
  () => `Journey of ${props.interviewJourneyCompany.company?.name}`
);
</script>
