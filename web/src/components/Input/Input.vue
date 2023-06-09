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
          error
            ? 'block w-full px-2 rounded-md border-0 py-1.5 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
            : 'block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
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

const onInput = (event: InputEvent) => {
  emits(
    'update:modelValue',
    (event.target as HTMLInputElement).value || undefined
  );
};
</script>
