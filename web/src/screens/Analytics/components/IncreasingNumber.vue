<template>
  <span
    ref="span"
    class="increasing-number"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

type IncreasingNumberProps = {
  number: number;
};

const props = defineProps<IncreasingNumberProps>();

const span = ref<HTMLElement>(null);

onMounted(() => {
  setTimeout(() => {
    span.value.style.setProperty('--number', String(props.number));
  }, 200);
});
</script>

<style scoped>
@property --number {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

.increasing-number {
  transition: --number 3s;
  counter-reset: number var(--number);
}

.increasing-number::before {
  content: counter(number);
}
</style>
