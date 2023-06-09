<template>
  <div>
    <label
      class="block text-sm font-medium leading-6 text-gray-900"
      v-text="label"
      :for="id"
    />
    <div class="mt-2">
      <input
        v-bind="$attrs"
        :id="id"
        class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type InputProps = {
  id?: string;
  label?: string;
  modelValue?: string;
};

defineProps<InputProps>();

type EmitActions = {
  (e: 'update:modelValue', value: string | undefined);
};

defineEmits<EmitActions>();
</script>
