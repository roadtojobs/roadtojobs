<template>
  <nav
    class="-mx-2 sm:-mx-6 lg:-mx-8 gap-2 flex items-center justify-between bg-white py-3"
    aria-label="Pagination"
  >
    <div class="hidden sm:block pl-3">
      <p class="text-sm text-gray-700">
        Showing
        {{ ' ' }}
        <span class="font-medium">{{ from }}</span>
        {{ ' ' }}
        to
        {{ ' ' }}
        <span class="font-medium">{{ to }}</span>
        {{ ' ' }}
        of
        {{ ' ' }}
        <span class="font-medium">{{ total }}</span>
        {{ ' ' }}
        results
      </p>
    </div>
    <div class="flex flex-1 justify-between sm:justify-end">
      <button
        class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:text-gray-400"
        :disabled="from <= 1"
        @click="$emit('prev')"
      >
        Previous
      </button>
      <button
        class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:text-gray-400"
        :disabled="to === total"
        @click="$emit('next')"
      >
        Next
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  total: number;
  from: number;
  to: number;
}>();

defineEmits<{
  (e: 'prev'): void;
  (e: 'next'): void;
}>();
</script>
