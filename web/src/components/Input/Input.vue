<template>
  <div>
    <label
      class="block text-sm font-medium leading-6 text-gray-900"
      v-text="label"
      :for="id"
    />
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        v-bind="$attrs"
        :id="id"
        :type="type || 'text'"
        :value="modelValue"
        :class="[
          'block w-full pl-3 rounded-md border-0 py-1.5 sm:text-sm sm:leading-6',
          'ring-1 ring-inset focus:ring-2 focus:ring-inset',
          error
            ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
            : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-rose-600 shadow-sm',
          type !== 'date' ? 'pr-10' : '',
        ]"
        @input="onInput"
      />
      <div
        v-if="error && type !== 'date'"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationCircleIcon
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
        />
      </div>
    </div>
    <p
      v-if="error"
      class="mt-2 text-xs text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';

type InputProps = {
  id?: string;
  label?: string;
  type?: 'text' | 'date' | 'number' | string;
  modelValue?: string | Date | number;
  error?: string;
};

defineProps<InputProps>();

type EmitActions = {
  (e: 'update:modelValue', value: string | undefined): void;
};

const emits = defineEmits<EmitActions>();

const onInput = (event: Event) => {
  emits(
    'update:modelValue',
    (event.target as HTMLInputElement).value || undefined
  );
};
</script>
