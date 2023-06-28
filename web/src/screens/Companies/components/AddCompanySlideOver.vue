<template>
  <Button
    :icon="PlusIcon"
    @click="onClickOpen"
  >
    Create new Company
  </Button>
  <SlideOver
    title="Add new Company"
    :is-open="isOpen"
    @close="onClose"
  >
    <div>
      <EditMode
        v-model:name="createForm.name"
        v-model:description="createForm.description"
        v-model:country-code="createForm.countryCode"
        v-model:homepage="createForm.homepage"
        :errorsBag="errorsBag"
      />
    </div>
    <template #bottom-buttons>
      <Button @click="onSubmitCreate">Create</Button>
      <Button
        type="secondary"
        @click="onClose"
      >
        Cancel
      </Button>
    </template>
  </SlideOver>
</template>

<script setup lang="ts">
import { Company } from 'shared';
import SlideOver from '@/components/SlideOver/SlideOver.vue';
import { ref } from 'vue';
import Button from '@/components/Button/Button.vue';
import EditMode from '@/screens/Companies/components/ViewCompanySlideOver/EditMode.vue';
import useValidation from '@/composable/useValidation';
import { notify } from '@kyvg/vue3-notification';
import { companyRepo } from '@/repositories/company.repo';
import {
  createCompany,
  CreateCompany,
  getBlankCreateCompany,
} from '@/screens/InterviewJourneyView/composables/useCreateNewCompany';
import { useCurrentUser } from '@/stores/useCurrentUser';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';

type ViewCompanySlideOverEmits = {
  (e: 'added', company: Company): void;
};

const emits = defineEmits<ViewCompanySlideOverEmits>();

const isOpen = ref(false);

const currentUser = useCurrentUser();
const { userId } = storeToRefs(currentUser);
const { validate, reset, errorsBag } =
  useValidation<CreateCompany>(createCompany);
const createForm = ref<CreateCompany>(getBlankCreateCompany(userId.value));

const onClickOpen = () => {
  isOpen.value = true;
  createForm.value = {
    ...getBlankCreateCompany(userId.value),
  };
};

const onClose = () => {
  isOpen.value = false;
};

const onSubmitCreate = async () => {
  reset();

  const validateResult = validate({ ...createForm.value });
  if (!validateResult.success) {
    return notify({
      type: 'error',
      title: 'Validation Error',
      text: 'Please check the error(s), fix and try again.',
    });
  }

  const company = await companyRepo.create(createForm.value);
  if (!company) {
    return notify({
      type: 'error',
      title: 'Creation Error',
      text: 'There was an error while creating the Company. Please try again.',
    });
  }

  emits('added', company);
  onClose();

  return notify({
    type: 'success',
    title: 'Created',
    text: 'Company has been created!',
  });
};
</script>
