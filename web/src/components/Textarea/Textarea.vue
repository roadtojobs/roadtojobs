<template>
  <div>
    <label
      class="block text-sm font-medium leading-6 text-gray-900"
      v-text="label"
      :for="id"
    />
    <div class="mt-2">
      <textarea
        v-bind="$attrs"
        :id="id"
        :value="modelValue"
        @input="onInput"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type TextareaProps = {
  id?: string;
  label?: string;
  modelValue?: string;
};

defineProps<TextareaProps>();

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
