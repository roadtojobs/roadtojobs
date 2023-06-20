<template>
  <div>
    <h2 class="text-sm font-medium text-gray-500 flex gap-2">
      <TagIcon class="w-5 h-5" />
      <span> Attributes </span>
    </h2>
    <ul
      v-if="!isEditing"
      role="list"
      class="mt-2 leading-8"
    >
      <li
        v-for="(attribute, index) in journeyItem.attributes"
        :key="`${index}-${attribute.text}`"
        class="inline"
      >
        <AttributeItem
          :color="attribute.color"
          :text="attribute.text"
        />
        {{ ' ' }}
      </li>
      <li
        v-if="!journeyItem?.attributes?.length"
        class="text-sm font-medium"
      >
        Empty
      </li>
    </ul>
    <div v-else>
      <div class="flex gap-2 items-center">
        <Dropdown
          v-model="test"
          class="w-16 mt-2"
          label=""
          empty-text=""
          :items="attributeDotColorsDropdownItems"
          item-classes="flex justify-center"
        >
          <template #custom-selected-item="{ currentValue }">
            <span
              class="h-4 w-4 rounded-full"
              :class="[attributeDotColors[currentValue]]"
            />
          </template>
          <template #custom-item="{ item }">
            <span
              class="h-4 w-4 rounded-full"
              :class="[attributeDotColors[item.value]]"
            />
          </template>
        </Dropdown>
        <Input
          label=""
          class="flex-1"
        />
        <span> X </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AttributeItem from '@/screens/InterviewJourneyView/components/Utils/AttributeItem.vue';
import { TagIcon } from '@heroicons/vue/24/outline';
import {
  DynamicAttributes,
  JourneyItem,
} from 'shared/entities/journeyItem.entity';
import Input from '@/components/Input/Input.vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import {
  attributeDotColors,
  attributeDotColorsDropdownItems,
} from '@/constants/attributeDotColors';

type JourneyItemDescriptionProps = {
  journeyItem: JourneyItem;
  isEditing?: boolean;
  modelValue: DynamicAttributes;
  error?: string;
};
type JourneyItemDescriptionEmit = {
  (e: 'update:modelValue', value: DynamicAttributes): void;
};

defineProps<JourneyItemDescriptionProps>();
defineEmits<JourneyItemDescriptionEmit>();

const test = ref('');
</script>
