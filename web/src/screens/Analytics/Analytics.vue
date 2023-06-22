<template>
  <AppPage
    header-title="Analytics"
    description="Check your performance across all journeys"
  >
    <h2 class="text-2xl mt-2 mb-6 font-medium">Performance of 2023 💪</h2>
    <dl
      class="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="stat in stats"
        :key="stat.id"
        class="flex flex-col bg-gray-400/5 p-8"
      >
        <dt class="text-sm font-semibold leading-6 text-gray-600">
          {{ stat.name }}
        </dt>
        <dd
          class="order-first text-3xl font-semibold tracking-tight text-gray-900"
        >
          {{ stat.value }}
        </dd>
      </div>
    </dl>
    <h2 class="text-2xl my-6 font-medium">Overall Performance ⚡️</h2>
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { setPageTitle } from '@/libraries/pageTitle';

const stats = [
  { id: 1, name: 'Creators on the platform', value: '8,000+' },
  { id: 2, name: 'Flat platform fee', value: '3%' },
  { id: 3, name: 'Uptime guarantee', value: '99.9%' },
  { id: 4, name: 'Paid out to creators', value: '$70M' },
];

setPageTitle('Analytics');
</script>
