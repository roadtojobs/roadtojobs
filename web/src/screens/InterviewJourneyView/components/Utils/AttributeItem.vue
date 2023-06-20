<template>
  <a
    class="select-none relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
  >
    <div class="absolute flex flex-shrink-0 items-center justify-center">
      <span
        class="h-1.5 w-1.5 rounded-full"
        :class="[attributeDotColors[color]]"
        aria-hidden="true"
      />
    </div>
    <div class="ml-3 text-xs font-semibold text-gray-900">
      {{ text }}
    </div>
  </a>
</template>

<script setup lang="ts">
import {
  attributeDotColors,
  AttributeDotColorType,
} from '@/constants/attributeDotColors';

type AttributeItemProps = {
  text: string;
  color: AttributeDotColorType;
};

defineProps<AttributeItemProps>();
</script>
