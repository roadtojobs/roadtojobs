<template>
  <RadioGroup
    :model-value="selectedColor"
    @update:model-value="updateColor"
  >
    <RadioGroupLabel class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </RadioGroupLabel>
    <div class="mt-4 flex items-center space-x-3">
      <RadioGroupOption
        as="template"
        v-for="(color, colorId) in colors"
        :key="colorId"
        :value="colorId"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            color.ringColor,
            active && checked ? 'ring ring-offset-1' : '',
            !active && checked ? 'ring-2' : '',
            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
          ]"
        >
          <RadioGroupLabel
            as="span"
            class="sr-only"
          >
            {{ color.name }}
          </RadioGroupLabel>
          <span
            aria-hidden="true"
            :title="color.name"
            :class="[
              color.backgroundColor,
              'h-8 w-8 rounded-full border border-black border-opacity-10',
            ]"
          />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

type ColorPickerType = {
  label: string;
  modelValue?: string;
};

type ColorPickerEmits = {
  (e: 'update:modelValue', value: string | undefined): void;
};

type ColorInfo = {
  name: string;
  backgroundColor: string;
  ringColor: string;
};

const colors: Record<string, ColorInfo> = {
  rose: {
    name: 'Rose',
    backgroundColor: 'bg-rose-500',
    ringColor: 'ring-rose-500',
  },
  pink: {
    name: 'Pink',
    backgroundColor: 'bg-pink-500',
    ringColor: 'ring-pink-500',
  },
  purple: {
    name: 'Purple',
    backgroundColor: 'bg-purple-500',
    ringColor: 'ring-purple-500',
  },
  blue: {
    name: 'Blue',
    backgroundColor: 'bg-blue-500',
    ringColor: 'ring-blue-500',
  },
  indigo: {
    name: 'Indigo',
    backgroundColor: 'bg-indigo-500',
    ringColor: 'ring-indigo-500',
  },
  yellow: {
    name: 'Yellow',
    backgroundColor: 'bg-yellow-500',
    ringColor: 'ring-yellow-500',
  },
  sky: {
    name: 'Sky',
    backgroundColor: 'bg-sky-500',
    ringColor: 'ring-sky-500',
  },
  gray: {
    name: 'Gray',
    backgroundColor: 'bg-gray-500',
    ringColor: 'ring-gray-500',
  },
};

const props = defineProps<ColorPickerType>();
const emits = defineEmits<ColorPickerEmits>();

const selectedColor = ref(props.modelValue);

const updateColor = (color: string) => {
  selectedColor.value = color;
  emits('update:modelValue', color);
};
</script>
