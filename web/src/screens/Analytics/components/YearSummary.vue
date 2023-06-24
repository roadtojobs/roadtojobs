<template>
  <dl
    class="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
  >
    <div
      v-for="(stat, key) in stats"
      :key="key"
      class="flex flex-col bg-gray-400/5 p-8"
    >
      <dt class="text-sm font-semibold leading-6 text-gray-600">
        {{ stat.name }}
      </dt>
      <dd
        class="order-first text-3xl font-semibold tracking-tight text-gray-900"
      >
        <span v-if="!stat.isLoaded"> - </span>
        <IncreasingNumber
          v-else
          :number="stat.value || 0"
        />
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IncreasingNumber from '@/screens/Analytics/components/IncreasingNumber.vue';
import { journeyRepo } from '@/repositories/journey.repo';
import { useCurrentUser } from '@/stores/useCurrentUser';
import {
  getInitStatisticInfo,
  StatisticInfo,
} from '@/screens/Analytics/components/YearSummary.methods';

type YearSummaryProps = {
  year?: number;
};

const props = defineProps<YearSummaryProps>();

const { userId } = useCurrentUser();

const stats = ref<StatisticInfo>(getInitStatisticInfo());

onMounted(() => {
  journeyRepo.getTotalJourneys(userId, props.year).then((total) => {
    stats.value.totalJourneys.value = total;
    stats.value.totalJourneys.isLoaded = true;
  });
});
</script>
