<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Page not found 😥
      </h2>
      <div class="mt-10 flex items-center gap-x-6">
        <Button @click="$router.push({ name: 'dashboard' })">
          Back to home page
        </Button>
        <a
          href="javascript:void(0)"
          class="text-sm font-semibold leading-6 text-gray-900"
          @click="$router.push({ name: 'interview-journey' })"
        >
          Interview Journeys <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from '@/components/Button/Button.vue';
</script>
