<template>
  <span
    class="text-sm font-medium"
    :class="textColor"
  >
    {{ stage.name }}
  </span>
</template>

<script setup lang="ts">
import { Stage } from '../../../../../../../shared/src/entities/stage.entity';
import { computed } from 'vue';

const props = defineProps<{
  stage: Stage;
}>();

const textColor = computed(() => {
  switch (props.stage.color) {
    case 'green':
      return 'text-green-700';
    case 'blue':
      return 'text-blue-700';
    case 'red':
      return 'text-red-700';
    case 'yellow':
      return 'text-yellow-700';
    case 'indigo':
      return 'text-indigo-700';
    case 'sky':
      return 'text-sky-700';
    case 'violet':
      return 'text-violet-700';
    case 'rose':
      return 'text-rose-500';
    case 'pink':
      return 'text-pink-500';
    default:
      return 'text-black';
  }
});
</script>
