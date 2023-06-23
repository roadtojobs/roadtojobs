<template>
  <SwitchGroup
    as="div"
    class="flex items-center"
  >
    <Switch
      :model-value="enabled"
      :class="[
        enabled ? 'bg-rose-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2',
      ]"
      @update:model-value="onToggleChanged"
    >
      <span
        aria-hidden="true"
        :class="[
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        ]"
      />
    </Switch>
    <SwitchLabel
      v-if="label"
      as="span"
      class="ml-3 text-sm cursor-pointer"
    >
      <span class="font-medium text-gray-900">{{ label }}</span>
    </SwitchLabel>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

type ToggleButtonProps = {
  id?: string;
  label?: string;
  modelValue?: boolean;
};

type ToggleButtonEmits = {
  (e: 'update:modelValue', value: boolean): void;
};

const props = withDefaults(defineProps<ToggleButtonProps>(), {
  id: () => `text-area-${Math.random()}`,
});

const emits = defineEmits<ToggleButtonEmits>();

const enabled = ref(props.modelValue || false);

const onToggleChanged = (value: boolean) => {
  enabled.value = value;
  emits('update:modelValue', value);
};
</script>
