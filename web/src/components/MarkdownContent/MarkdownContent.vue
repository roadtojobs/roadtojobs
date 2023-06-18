<template>
  <div
    class="prose-sm prose-ul:list-disc prose-ol:list-decimal"
    v-html="renderedMarkdownContent"
  />
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';
import { computed, useSlots } from 'vue';
import { marked } from 'marked';

const slots = useSlots();

const renderedMarkdownContent = computed(() => {
  const content = slots.default?.()[0].children;

  return DOMPurify.sanitize(
    marked(content as string, { mangle: false, headerIds: false })
  );
});
</script>
