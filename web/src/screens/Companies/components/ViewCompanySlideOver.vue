<template>
  <SlideOver
    :is-open="isOpen"
    :title="companyTitle"
    @close="onClose"
  >
    <div v-if="company">
      <ViewMode
        v-if="!isEdit"
        :company="company"
      />
      <EditMode
        v-else
        v-model:name="editForm.name"
        v-model:description="editForm.description"
        v-model:country-code="editForm.countryCode"
        v-model:homepage="editForm.homepage"
      />
    </div>
    <template
      v-if="!isEdit"
      #bottom-buttons
    >
      <Button @click="onClickEdit">Edit</Button>
      <Button type="secondary">Close</Button>
    </template>
    <template
      v-else
      #bottom-buttons
    >
      <Button>Submit</Button>
      <Button
        type="secondary"
        @click="isEdit = false"
      >
        Cancel
      </Button>
    </template>
  </SlideOver>
</template>

<script setup lang="ts">
import { Company } from 'shared';
import SlideOver from '@/components/SlideOver/SlideOver.vue';
import { computed, ref, watch } from 'vue';
import Button from '@/components/Button/Button.vue';
import ViewMode from '@/screens/Companies/components/ViewCompanySlideOver/ViewMode.vue';
import { EditCompany } from '@/screens/Companies/Companies.models';
import EditMode from '@/screens/Companies/components/ViewCompanySlideOver/EditMode.vue';

type ViewCompanySlideOverProps = {
  company: Company | null;
};

type ViewCompanySlideOverEmits = {
  (e: 'close'): void;
};

const props = defineProps<ViewCompanySlideOverProps>();
const emits = defineEmits<ViewCompanySlideOverEmits>();

const isOpen = ref(false);

const isEdit = ref(false);
const editForm = ref<EditCompany>({
  countryCode: '',
  description: '',
  homepage: '',
  name: '',
});

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

const onClickEdit = () => {
  isEdit.value = true;
  editForm.value = {
    countryCode: props.company?.countryCode || '',
    description: props.company?.description || '',
    homepage: props.company?.homepage || '',
    name: props.company?.name || '',
  };
};
</script>
