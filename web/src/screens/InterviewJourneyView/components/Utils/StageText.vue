<template>
  <span
    class="text-sm font-medium"
    :class="{
      'text-green-700': stage.color === 'green',
      'text-blue-700': stage.color === 'blue',
      'text-red-700': stage.color === 'red',
      'text-pink-500': stage.color === 'pink',
      'text-yellow-700': stage.color === 'yellow',
      'text-indigo-700': stage.color === 'indigo',
      'text-sky-700': stage.color === 'sky',
      'text-rose-500': stage.color === 'rose',
      'text-violet-700': stage.color === 'violet',
      'text-black': stage.color === 'black',
    }"
  >
    {{ stage.name }}
  </span>
</template>

<script setup lang="ts">
import { Stage } from '@/repositories/stage.repo';

defineProps<{
  stage: Stage;
}>();
</script>
