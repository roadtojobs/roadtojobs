<template>
  <button
    type="button"
    class="flex gap-2 rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="typeClass"
    :disabled="isLoading || disabled"
  >
    <component
      v-if="icon && !isLoading"
      :is="icon"
      class="h-5 w-5"
    />
    <LoadingIcon
      v-if="isLoading"
      class="h-5 w-5 animate-spin"
    />
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VueComponent } from '@/types';
import { ArrowPathIcon as LoadingIcon } from '@heroicons/vue/24/outline';

type ButtonProps = {
  type?: 'primary' | 'neutral' | 'secondary' | 'success' | 'error' | 'warning';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: VueComponent;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
});

const typeClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-rose-600 hover:bg-rose-500 focus-visible:outline-rose-600 disabled:bg-rose-300';

    case 'neutral':
      return 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:bg-indigo-300';

    case 'secondary':
      return 'bg-neutral-600 hover:bg-neutral-500 focus-visible:outline-neutral-600 disabled:bg-neutral-300';

    case 'success':
      return 'bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-emerald-600 disabled:bg-emerald-300';

    case 'error':
      return 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 disabled:bg-red-300';

    case 'warning':
      return 'bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600 disabled:bg-yellow-300';

    default:
      return '';
  }
});
</script>

<style scoped></style>
