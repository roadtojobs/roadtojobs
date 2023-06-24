<template>
  <AppPage
    header-title="Analytics"
    description="Check your performance across all journeys"
  >
    <div class="mt-2 mb-6 flex gap-3 flex-col">
      <h2 class="text-2xl mt-2 font-medium">
        Performance of {{ thisYear }} 💪
      </h2>
      <p class="text-md text-gray-600">
        Let's see how far have you gone in {{ thisYear }} 🚀
      </p>
    </div>
    <YearSummary :year="thisYear" />

    <div class="my-6 flex gap-3 flex-col">
      <h2 class="text-2xl font-medium">Overall Performance ⚡️</h2>
      <p class="text-md text-gray-600">Sum up everything from the start 🔥</p>
    </div>
    <YearSummary />

    <div class="pb-32"></div>
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { setPageTitle } from '@/libraries/pageTitle';
import YearSummary from '@/screens/Analytics/components/YearSummary.vue';

setPageTitle('Analytics');

const thisYear = new Date().getFullYear();
</script>
