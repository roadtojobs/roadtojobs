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
        :errorsBag="errorsBag"
      />
    </div>
    <template
      v-if="!isEdit"
      #bottom-buttons
    >
      <Button @click="onClickEdit">Edit</Button>
      <Button
        id="close-view-company-button"
        type="secondary"
        @click="onClose"
      >
        Close
      </Button>
    </template>
    <template
      v-else
      #bottom-buttons
    >
      <Button @click="onSubmitEdit">Submit</Button>
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
import { editCompany, EditCompany } from '@/screens/Companies/Companies.models';
import EditMode from '@/screens/Companies/components/ViewCompanySlideOver/EditMode.vue';
import useValidation from '@/composable/useValidation';
import { notify } from '@kyvg/vue3-notification';
import { companyRepo } from '@/repositories/company.repo';

type ViewCompanySlideOverProps = {
  company: Company | null;
};

type ViewCompanySlideOverEmits = {
  (e: 'close'): void;
  (e: 'updated', company: Company): void;
};

const props = defineProps<ViewCompanySlideOverProps>();
const emits = defineEmits<ViewCompanySlideOverEmits>();

const isOpen = ref(false);

const isEdit = ref(false);
const { validate, reset, errorsBag } = useValidation<EditCompany>(editCompany);
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

const onSubmitEdit = async () => {
  reset();

  if (!props.company?.id) {
    return;
  }

  const validateResult = validate({ ...editForm.value });
  if (!validateResult.success) {
    return notify({
      type: 'error',
      title: 'Validation Error',
      text: 'Please check the error(s), fix and try again.',
    });
  }

  const company = await companyRepo.update(props.company?.id, editForm.value);
  if (!company) {
    return notify({
      type: 'error',
      title: 'Update Error',
      text: 'There was an error while updating the Company. Please try again.',
    });
  }

  emits('updated', company);
  isEdit.value = false;

  return notify({
    type: 'success',
    title: 'Updated',
    text: 'Company has been updated!',
  });
};
</script>
