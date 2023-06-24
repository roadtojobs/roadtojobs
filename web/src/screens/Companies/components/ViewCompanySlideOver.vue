<template>
  <SlideOver
    :is-open="isOpen"
    :title="companyTitle"
    @close="onClose"
  >
    Hello
  </SlideOver>
</template>

<script setup lang="ts">
import { Company } from 'shared';
import SlideOver from '@/components/SlideOver/SlideOver.vue';
import { computed, ref, watch } from 'vue';

type ViewCompanySlideOverProps = {
  company: Company | null;
};

type ViewCompanySlideOverEmits = {
  (e: 'close');
};

const props = defineProps<ViewCompanySlideOverProps>();
const emits = defineEmits<ViewCompanySlideOverEmits>();

const isOpen = ref(false);

const companyTitle = computed(
  () => `Viewing Company: ${props.company?.name || ''}`
);

watch(
  () => props.company,
  (value) => {
    isOpen.value = !!value;
  }
);

const onClose = () => {
  isOpen.value = false;
  emits('close');
};
</script>
