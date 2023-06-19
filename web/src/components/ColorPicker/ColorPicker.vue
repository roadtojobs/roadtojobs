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
import { colors } from '@/constants/nodeColors';

type ColorPickerType = {
  label: string;
  modelValue?: string;
};

type ColorPickerEmits = {
  (e: 'update:modelValue', value: string | undefined): void;
};

const props = defineProps<ColorPickerType>();
const emits = defineEmits<ColorPickerEmits>();

const selectedColor = ref(props.modelValue);

const updateColor = (color: string) => {
  selectedColor.value = color;
  emits('update:modelValue', color);
};
</script>
