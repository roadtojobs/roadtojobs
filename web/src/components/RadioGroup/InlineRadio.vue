<template>
  <div>
    <label class="text-sm font-medium leading-6 text-gray-900 select-none">
      {{ label }}
    </label>
    <p
      v-if="subLabel"
      class="text-xs text-gray-500"
    >
      {{ subLabel }}
    </p>
    <fieldset class="mt-4">
      <legend class="sr-only">{{ label }}</legend>
      <div class="sm:flex sm:items-center sm:flex-wrap gap-4">
        <div
          v-for="(item, index) in items"
          :key="`radio-${item.value}-${index}`"
          class="flex items-center"
        >
          <input
            :id="item.value"
            :name="name"
            type="radio"
            :checked="item.value === modelValue"
            class="h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-600"
            @input="$emit('update:modelValue', item.value)"
          />
          <label
            :for="item.value"
            class="ml-3 block text-sm font-medium leading-6 text-gray-900"
          >
            {{ item.text }}
          </label>
        </div>
      </div>
      <p
        v-if="error"
        class="mt-2 text-xs text-red-600"
      >
        {{ error }}
      </p>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { RadioItem } from '@/components/RadioGroup/RadioGroup.methods';

type InlineRadioProps = {
  name: string;
  label: string;
  subLabel?: string;
  modelValue?: string;
  items: RadioItem[];
  error?: string;
};

type InlineRadioEmits = {
  (e: 'update:modelValue', value: string | undefined): void;
};

defineProps<InlineRadioProps>();
defineEmits<InlineRadioEmits>();
</script>
