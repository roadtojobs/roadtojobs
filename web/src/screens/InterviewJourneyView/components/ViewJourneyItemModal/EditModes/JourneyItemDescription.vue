<template>
  <div class="py-3 xl:pb-0 xl:pt-6">
    <h2 class="sr-only">Description</h2>
    <div
      v-if="!isEditing"
      class="prose-xl prose-ul:list-disc prose-ol:list-decimal max-w-none"
    >
      <MarkdownContent>{{ journeyItem.description }}</MarkdownContent>
    </div>
    <div v-else>
      <Textarea
        label=""
        :model-value="modelValue"
        @update:model-value="(value) => $emit('update:modelValue', value)"
        rows="8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent.vue';
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import Textarea from '@/components/Textarea/Textarea.vue';

type JourneyItemDescriptionProps = {
  journeyItem: JourneyItem;
  isEditing?: boolean;
  modelValue?: string;
};
type JourneyItemDescriptionEmit = {
  (e: 'update:modelValue', value: string | undefined): void;
};

defineProps<JourneyItemDescriptionProps>();
defineEmits<JourneyItemDescriptionEmit>();
</script>
