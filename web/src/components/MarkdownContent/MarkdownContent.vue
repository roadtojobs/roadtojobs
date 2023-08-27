<template>
  <div
    :class="[
      'w-full prose-sm',
      'prose-ul:list-disc prose-ol:list-decimal',
      'prose-a:text-rose-600',
      'prose-blockquote:border-l-4',
      'prose-pre:border prose-pre:p-4 prose-code:rounded',
    ]"
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

  marked.use({
    renderer: {
      link(href, title, text) {
        const legitTitle = title || 'RoadToJobs';
        return `<a href="${href}" title="${legitTitle}" target="_blank">${text}</a>`;
      },
    },
  });

  const markedDown = marked.parse(content as string);
  return DOMPurify.sanitize(markedDown, {
    ADD_ATTR: ['target'],
  });
});
</script>
