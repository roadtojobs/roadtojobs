<template>
  <Teleport to="body">
    <div
      class="fixed z-90 bottom-10 cursor-pointer right-8 bg-rose-400 w-14 h-14 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-rose-600 hover:drop-shadow-2xl"
      @click="$emit('add')"
    >
      <PlusIcon class="w-10" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';

type FloatingAddJourneyItemEmits = {
  (e: 'add'): void;
};

defineEmits<FloatingAddJourneyItemEmits>();
</script>
