<template>
  <div class="py-3 xl:pb-0 xl:pt-3">
    <h2 class="sr-only">Description</h2>
    <div
      v-if="!isEditing"
      class="prose-xl prose-ul:list-disc prose-ol:list-decimal max-w-none"
    >
      <MarkdownContent>{{ journeyItem.description }}</MarkdownContent>
    </div>
    <div v-else>
      <MarkdownEditor
        :model-value="modelValue"
        :error="error"
        :height="450"
        @update:model-value="(value) => $emit('update:modelValue', value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent.vue';
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import MarkdownEditor from '@/components/MarkdownEditor/MarkdownEditor.vue';

type JourneyItemDescriptionProps = {
  journeyItem: JourneyItem;
  isEditing?: boolean;
  modelValue?: string;
  error?: string;
};
type JourneyItemDescriptionEmit = {
  (e: 'update:modelValue', value: string | undefined): void;
};

defineProps<JourneyItemDescriptionProps>();
defineEmits<JourneyItemDescriptionEmit>();
</script>
