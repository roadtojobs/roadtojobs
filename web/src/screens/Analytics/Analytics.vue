<template>
  <AppPage
    header-title="Analytics"
    description="Check your performance across all journeys"
  >
    <h2 class="text-2xl mt-2 mb-6 font-medium">
      Performance of {{ thisYear }} 💪
    </h2>
    <YearSummary :year="thisYear" />

    <h2 class="text-2xl my-6 font-medium">Overall Performance ⚡️</h2>
    <YearSummary />
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { setPageTitle } from '@/libraries/pageTitle';
import YearSummary from '@/screens/Analytics/components/YearSummary.vue';

setPageTitle('Analytics');

const thisYear = new Date().getFullYear();
</script>
