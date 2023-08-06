<template>
  <div>
    <label
      class="block text-sm font-medium leading-6 text-gray-900"
      v-text="label"
      :for="id"
    />
    <div class="relative mt-2 rounded-md shadow-sm">
      <wysimark
        :id="id"
        :model-value="modelValue"
        :height="height"
        :throttle-in-ms="500"
        :class="['markdown-editor']"
        @update:modelValue="onInput"
      />
      <div
        v-if="error"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationCircleIcon
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
        />
      </div>
    </div>
    <p
      v-if="error"
      class="mt-2 text-xs text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';
import Wysimark from '@wysimark/vue';

type MarkdownEditorProps = {
  id?: string;
  label?: string;
  modelValue?: string;
  error?: string;
  height?: number;
};

withDefaults(defineProps<MarkdownEditorProps>(), {
  id: () => `markdown-editor-${Math.random()}`,
  height: () => 300,
});

type MarkdownEditorEmits = {
  (e: 'update:modelValue', value: string | undefined): void;
};

const emits = defineEmits<MarkdownEditorEmits>();

const onInput = (value: string) => emits('update:modelValue', value);
</script>

<style scoped lang="postcss">
.markdown-editor :deep([role='textbox']) {
  padding: 0.5rem 1rem;
}
</style>
