<template>
  <dl class="grid grid-cols-1">
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Company Name</dt>
      <dd class="mt-1 sm:mt-2">
        <Input
          label=""
          :model-value="name"
          @update:model-value="(value) => $emit('update:name', value)"
        />
      </dd>
    </div>
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Country</dt>
      <dd class="mt-1 sm:mt-2">
        <Input
          label=""
          :model-value="countryCode"
          @update:model-value="(value) => $emit('update:countryCode', value)"
        />
      </dd>
    </div>
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Homepage</dt>
      <dd class="mt-1 sm:mt-2">
        <Input
          label=""
          :model-value="homepage"
          @update:model-value="(value) => $emit('update:homepage', value)"
        />
      </dd>
    </div>
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Homepage</dt>
      <dd class="mt-1 prose-sm prose-ul:list-disc prose-ol:list-decimal">
        <Textarea
          label=""
          :model-value="description"
          @update:model-value="(value) => $emit('update:description', value)"
          rows="8"
        />
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import Input from '@/components/Input/Input.vue';
import Textarea from '@/components/Textarea/Textarea.vue';

type EditModeProps = {
  name: string;
  homepage: string;
  description: string;
  countryCode: string;
};

type EditModeEmits = {
  (e: 'update:name', value: string): void;
  (e: 'update:homepage', value: string): void;
  (e: 'update:description', value: string): void;
  (e: 'update:countryCode', value: string): void;
};

defineProps<EditModeProps>();
defineEmits<EditModeEmits>();
</script>
