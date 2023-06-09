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
        @change="query = $event.target.value"
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
        v-if="filteredItems.length > 0"
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
              active ? 'bg-rose-200 text-white' : 'text-gray-900',
            ]"
          >
            <div class="flex items-center">
              <span
                v-if="typeof item.mode !== 'undefined'"
                :class="[
                  'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                  item.mode === 'green' ? 'bg-green-400' : '',
                  item.mode === 'red' ? 'bg-red-600' : '',
                  item.mode === 'yellow' ? 'bg-yellow-400' : '',
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

type ComboboxProps = {
  label: string;
  items: ComboboxItem[];
  modelValue: ComboboxItem | null;
};

type ComboboxEmits = {
  (e: 'update:modelValue', value: ComboboxItem | undefined): void;
};

const props = defineProps<ComboboxProps>();
const emits = defineEmits<ComboboxEmits>();

const query = ref('');
const selectedItem = ref<ComboboxItem | null>(props.modelValue || null);
const filteredItems = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter((item) => {
        return item.text.toLowerCase().includes(query.value.toLowerCase());
      })
);

const selectItem = (item: ComboboxItem) => {
  selectedItem.value = { ...item };
  emits('update:modelValue', item);
};
</script>
