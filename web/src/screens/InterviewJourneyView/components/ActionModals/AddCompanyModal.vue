<template>
  <Modal
    v-if="isOpen"
    :is-open="isOpen"
    title="Add Company to the Journey"
    @close="$emit('close')"
    width-size="xl"
  >
    <div class="my-4">
      <form
        @submit.prevent
        class="flex flex-col gap-3"
      >
        <Dropdown
          v-model="form.stageId"
          label="Stage"
          :items="globalStages.comboboxStages"
          :error="errorsBag.get('stageId')"
        />
        <ComboboxApi
          v-model="form.company"
          label="Choose Company"
          :api-request="findCompanies"
          :error="errorsBag.get('companyId')"
        />
        <Textarea
          v-model="form.description"
          label="Description"
          rows="6"
          placeholder="Write a really detailed information about this company. Markdown syntax supported..."
          :error="errorsBag.get('description')"
        />
      </form>
    </div>
    <template #bottom-buttons>
      <Button @click="onClickSubmit">Add</Button>
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
import { Stage } from 'shared/entities/stage.entity';
import Modal from '@/components/Modal/Modal.vue';
import Button from '@/components/Button/Button.vue';
import Textarea from '@/components/Textarea/Textarea.vue';
import { useGlobalStages } from '@/stores/useGlobalStages';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import ComboboxApi from '@/components/Combobox/ComboboxApi.vue';
import { ComboboxItem } from '@/components/Combobox/Combobox.types';
import { companyRepo } from '@/repositories/company.repo';
import useValidation from '@/composable/useValidation';
import {
  createJourneyItem,
  CreateJourneyItem,
} from '@/screens/InterviewJourneyView/components/ActionModals/AddCompanyModal.methods';
import { notify } from '@kyvg/vue3-notification';
import { journeyItemRepo } from '@/repositories/journeyItem.repo';
import { useCurrentUser } from '@/stores/useCurrentUser';

type AddCompanyModalProps = {
  stage: Stage;
  isOpen: boolean;
};

type AddCompanyModalEmits = {
  (e: 'close'): void;
  (e: 'created'): void;
};

const props = defineProps<AddCompanyModalProps>();
const emits = defineEmits<AddCompanyModalEmits>();

const {
  errorsBag,
  validate,
  reset: clearErrorsBag,
} = useValidation<CreateJourneyItem>(createJourneyItem);
const globalStages = useGlobalStages();
const { userId } = useCurrentUser();

const form = ref<{
  stageId: string;
  company: {
    value: string;
    text: string;
  } | null;
  description: string;
}>({
  stageId: props.stage.id,
  company: null,
  description: '',
});

const findCompanies = async (keyword: string): Promise<ComboboxItem[]> => {
  return (await companyRepo.getByKeyword(keyword)).map((company) => ({
    text: company.name,
    value: company.id,
    active: true,
  }));
};

const onClickSubmit = async () => {
  clearErrorsBag();

  const finalForm = {
    ...form.value,
    companyId: form.value.company?.value,
    userId,
    journeyId: '', // add
  };

  const validateResult = validate(finalForm);
  if (!validateResult.success) {
    return notify({
      type: 'error',
      title: 'Validation Error',
      text: 'Please check the error(s), fix and try again.',
    });
  }

  const creationResult = await journeyItemRepo.create(
    validateResult.parsedObject
  );

  if (!creationResult) {
    return notify({
      type: 'error',
      title: 'Creation Error',
      text: 'There was an error while handling the creation. Please try again.',
    });
  }

  notify({
    type: 'success',
    title: 'Created',
    text: `Your journey item is created. Let's get started 🔥`,
  });

  emits('created');
};
</script>
