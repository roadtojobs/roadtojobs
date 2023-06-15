<template>
  <Modal
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
        <Combobox
          v-model="form.stage"
          label="Stage"
          :items="stageComboboxItems"
        />
        <!--        <Combobox-->
        <!--          mode="ASYNC"-->
        <!--          label="Select Company"-->
        <!--        />-->
        <Textarea
          label="Description (Markdown supported)"
          rows="6"
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
import Combobox from '@/components/Combobox/Combobox.vue';
import Textarea from '@/components/Textarea/Textarea.vue';
import { useGlobalStages } from '@/stores/useGlobalStages';

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
});

const modalTitle = computed(() => `Add Company to the Journey`);

const stageComboboxItems = computed(() =>
  globalStages.stages.map((stage) => ({
    text: stage.name,
    value: stage.id,
    active: true,
  }))
);
</script>
