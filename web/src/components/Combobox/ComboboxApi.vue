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
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
        :class="{
          'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500':
            !!error,
        }"
        @change="retrieveItems($event.target.value)"
        :display-value="(item) => item ? (item as ComboboxItem).text : ''"
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
          v-for="item in flexibleItems"
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
        <ComboboxOption v-if="flexibleItems.length <= 0 && !query.length">
          <span class="text-gray-900 ml-3 truncate text-sm my-4 select-none">
            Hit some keywords to search 👀
          </span>
        </ComboboxOption>
        <ComboboxOption v-if="isLoading">
          <span class="text-gray-600 ml-3 truncate text-sm my-4 select-none">
            Retrieving records...
          </span>
        </ComboboxOption>
        <ComboboxOption
          v-if="!isLoading && flexibleItems.length <= 0 && query.length"
        >
          <span class="text-gray-600 ml-3 truncate text-sm my-4 select-none">
            No record found with the "{{ query }}" keywords.
          </span>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
    <p
      v-if="error"
      class="mt-2 text-xs text-red-600"
    >
      {{ error }}
    </p>
  </Combobox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
import { useLoading } from '@/composable/useLoading';
import { debounce } from 'lodash-es';

type ComboboxApiProps = {
  label: string;
  modelValue: ComboboxItem | null;
  apiRequest: (keyword: string) => Promise<ComboboxItem[]>;
  error?: string;
};

type ComboboxApiEmits = {
  (e: 'update:modelValue', value: ComboboxItem | undefined): void;
};

const props = defineProps<ComboboxApiProps>();
const emits = defineEmits<ComboboxApiEmits>();

const { isLoading, startLoading, stopLoading } = useLoading();

const flexibleItems = ref<ComboboxItem[]>([]);

const query = ref('');
const selectedItem = ref<ComboboxItem | null>(props.modelValue || null);

const selectItem = (item: ComboboxItem) => {
  selectedItem.value = { ...item };
  emits('update:modelValue', item);
};

const resetItems = () => (flexibleItems.value = []);

const debouncedApiRequest = debounce(() => {
  if (!query.value) {
    return resetItems();
  }

  startLoading();

  props
    .apiRequest(query.value)
    .then((data) => {
      flexibleItems.value = [...data];
    })
    .catch(resetItems)
    .finally(stopLoading);
}, 500);

const retrieveItems = async (keyword: string) => {
  query.value = keyword;
  if (!query.value) {
    return resetItems();
  }

  debouncedApiRequest();
};
</script>
