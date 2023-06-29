<template>
  <dl class="grid grid-cols-1">
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Company Name</dt>
      <dd class="mt-1 sm:mt-2">
        <Input
          id="company_name"
          label=""
          placeholder="The company name"
          :model-value="name"
          :error="errorsBag.get('name')"
          @update:model-value="(value) => $emit('update:name', value)"
        />
      </dd>
    </div>
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Country Code</dt>
      <dd class="mt-1 sm:mt-2">
        <Input
          label=""
          id="company_country_code"
          placeholder="Origin Country of the Company"
          :model-value="countryCode"
          :error="errorsBag.get('countryCode')"
          @update:model-value="(value) => $emit('update:countryCode', value)"
        />
      </dd>
    </div>
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Homepage</dt>
      <dd class="mt-1 sm:mt-2">
        <Input
          label=""
          id="company_homepage"
          placeholder="Website of the Company"
          :model-value="homepage"
          :error="errorsBag.get('homepage')"
          @update:model-value="(value) => $emit('update:homepage', value)"
        />
      </dd>
    </div>
    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">Description</dt>
      <dd class="mt-1 prose-sm prose-ul:list-disc prose-ol:list-decimal">
        <Textarea
          label=""
          rows="8"
          id="company_description"
          placeholder="The information of this company. Markdown supported"
          :model-value="description"
          :error="errorsBag.get('description')"
          @update:model-value="(value) => $emit('update:description', value)"
        />
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import Input from '@/components/Input/Input.vue';
import Textarea from '@/components/Textarea/Textarea.vue';
import { CreateCompany } from '@/screens/InterviewJourneyView/composables/useCreateNewCompany';

type EditModeProps = {
  name?: string;
  homepage?: string;
  description?: string;
  countryCode?: string;
  errorsBag: Map<keyof CreateCompany, string | undefined>;
};

type EditModeEmits = {
  (e: 'update:name', value: string | undefined): void;
  (e: 'update:homepage', value: string | undefined): void;
  (e: 'update:description', value: string | undefined): void;
  (e: 'update:countryCode', value: string | undefined): void;
};

defineProps<EditModeProps>();
defineEmits<EditModeEmits>();
</script>
