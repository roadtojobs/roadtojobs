<template>
  <button
    type="button"
    class="flex gap-2 rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="typeClass"
    :disabled="disabled"
  >
    <component v-if="icon" :is="icon" class="h-5 w-5" />
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VueComponent } from '@/types';

type ButtonProps = {
  type: 'primary' | 'neutral' | 'secondary' | 'success' | 'error' | 'warning';
  disabled?: boolean;
  icon?: VueComponent;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
});

const typeClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-rose-600 hover:bg-rose-500 focus-visible:outline-rose-600';

    case 'neutral':
      return 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600';

    case 'secondary':
      return 'bg-neutral-600 hover:bg-neutral-500 focus-visible:outline-neutral-600';

    case 'success':
      return 'bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-emerald-600';

    case 'error':
      return 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600';

    case 'warning':
      return 'bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600';

    default:
      return '';
  }
});
</script>

<style scoped></style>
