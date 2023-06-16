<template>
  <Combobox
    as="div"
    :model-value="selectedItem"
    @update:model-value="selectItem"
  >
    <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </ComboboxLabel>
    <div class="relative mt-2">
      <ComboboxInput
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        @change="retrieveItems($event.target.value)"
        :display-value="(item) => item?.text || 'Select an Option'"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <ChevronUpDownIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </ComboboxButton>

      <ComboboxOptions
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="item in filteredItems"
          :key="item.value"
          :value="item"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
            ]"
          >
            <div class="flex items-center">
              <span
                v-if="typeof item.active !== 'undefined'"
                :class="[
                  'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                  !item.active ? 'bg-green-400' : 'bg-gray-200',
                ]"
                aria-hidden="true"
              />
              <span :class="['ml-3 truncate', selected && 'font-semibold']">
                {{ item.text }}
              </span>
            </div>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-indigo-600',
              ]"
            >
              <CheckIcon
                class="h-5 w-5"
                aria-hidden="true"
              />
            </span>
          </li>
        </ComboboxOption>
        <ComboboxOption v-if="filteredItems.length <= 0">
          <span class="text-gray-900 ml-3 truncate text-sm">
            Hit some keywords to search 👀
          </span>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue';
import { ComboboxItem } from '@/components/Combobox/Combobox.types';

type ComboboxApiProps = {
  label: string;
  modelValue: ComboboxItem | null;
  apiRequest: (keyword: string) => Promise<ComboboxItem[]>;
};

type ComboboxApiEmits = {
  (e: 'update:modelValue', value: ComboboxItem | undefined): void;
};

const props = defineProps<ComboboxApiProps>();
const emits = defineEmits<ComboboxApiEmits>();

const flexibleItems = ref<ComboboxItem[]>([]);

const query = ref('');
const selectedItem = ref<ComboboxItem | null>(props.modelValue || null);
const filteredItems = computed(() => flexibleItems.value);

const selectItem = (item: ComboboxItem) => {
  selectedItem.value = { ...item };
  emits('update:modelValue', item);
};

const retrieveItems = async (keyword: string) => {
  query.value = keyword;

  // TODO: add loading...
  const items = await props.apiRequest(keyword);
  flexibleItems.value = [...items];
};
</script>
