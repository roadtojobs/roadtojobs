<template>
  <dl class="grid grid-cols-1">
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Company Name</dt>
      <dd
        class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"
        data-testid="view-company-name"
      >
        {{ company.name }}
      </dd>
    </div>
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Country</dt>
      <dd
        class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"
        data-testid="view-company-country-code"
      >
        {{ company.countryCode }}
      </dd>
    </div>
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Homepage</dt>
      <dd
        class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2"
        data-testid="view-company-homepage"
      >
        {{ company.homepage || '-' }}
      </dd>
    </div>
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Description</dt>
      <dd
        class="mt-1 prose-sm prose-ul:list-disc prose-ol:list-decimal"
        data-testid="view-company-description"
      >
        <MarkdownContent>{{ company.description || '-' }}</MarkdownContent>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import { Company } from 'shared';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent.vue';

type ViewModeProps = {
  company: Company;
};

defineProps<ViewModeProps>();
</script>
