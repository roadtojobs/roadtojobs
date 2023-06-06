<template>
  <div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center border-b lg:pb-6 pb-2">
        <div class="sm:flex-auto">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {{ headerTitle }}
          </h1>
          <p class="mt-2 text-md leading-8 text-gray-600">
            {{ description }}
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <slot name="right-buttons" />
        </div>
      </div>
    </div>
    <div class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  headerTitle: string;
  description?: string;
}>();
</script>
