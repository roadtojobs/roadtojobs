<template>
  <Menu
    as="div"
    class="relative inline-block text-left"
  >
    <label
      class="block text-sm font-medium leading-6 text-gray-900 mb-2"
      v-text="label"
    />
    <div>
      <MenuButton
        class="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        :class="{
          'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500':
            !!error,
        }"
      >
        <span>
          {{ itemValueMap[String(modelValue)] || emptyText }}
        </span>
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-100 max-h-60 overflow-y-auto mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem
            v-for="(item, index) in items"
            :key="`${item.value}-${index}`"
          >
            <a
              href="javascript:void(0);"
              :class="[
                modelValue === item.value
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700',
                'px-4 py-2 text-sm',
                itemClasses,
              ]"
              @click="$emit('update:modelValue', item.value)"
            >
              <slot
                name="custom-item"
                :item="item"
                :currentValue="modelValue"
                @click="$emit('update:modelValue', item.value)"
              />
              <span v-if="!$slots['custom-item']">{{ item.text }}</span>
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
    <p
      v-if="error"
      class="mt-2 text-xs text-red-600"
    >
      {{ error }}
    </p>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { DropdownItem } from '@/components/Dropdown/Dropdown.types';
import { StringRecord } from '@/types';

type DropdownProps = {
  label: string;
  items: DropdownItem[];
  modelValue: string | number | null;
  error?: string;
  emptyText?: string;
  itemClasses?: string;
};

type DropdownEmits = {
  (e: 'update:modelValue', value: string | number): void;
};

const props = withDefaults(defineProps<DropdownProps>(), {
  emptyText: 'Select Option',
  itemClasses: 'block',
});
defineEmits<DropdownEmits>();

const itemValueMap = computed(() => {
  return props.items.reduce<StringRecord>((values, record) => {
    values[record.value] = record.text;
    return values;
  }, {});
});
</script>

<style scoped>
.z-100 {
  z-index: 100;
}
</style>
