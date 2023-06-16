<template>
  <Modal
    v-if="isOpen"
    :is-open="isOpen"
    :title="modalTitle"
    @close="$emit('close')"
    width-size="xl"
  >
    <div class="my-4">
      <form
        @submit.prevent
        class="flex flex-col gap-3"
      >
        <Dropdown
          v-model="form.stage"
          label="Stage"
          :items="globalStages.comboboxStages"
        />
        <ComboboxApi
          v-model="form.company"
          label="Choose Company"
          :api-request="findCompanies"
        />
        <Textarea
          label="Description"
          rows="6"
          placeholder="Write a really detailed information about this company. Markdown syntax supported..."
        />
      </form>
    </div>
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
import Textarea from '@/components/Textarea/Textarea.vue';
import { useGlobalStages } from '@/stores/useGlobalStages';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import ComboboxApi from '@/components/Combobox/ComboboxApi.vue';
import { ComboboxItem } from '@/components/Combobox/Combobox.types';

type AddCompanyModalProps = {
  stage: Stage;
  isOpen: boolean;
};

const props = defineProps<AddCompanyModalProps>();

defineEmits<{
  (e: 'close'): void;
}>();

const globalStages = useGlobalStages();

const form = ref({
  stage: props.stage.id,
  company: null,
});

const modalTitle = computed(() => `Add Company to the Journey`);

const findCompanies = async (keyword: string): Promise<ComboboxItem[]> => {
  return [];
};
</script>
