<template>
  <aside class="hidden xl:block xl:pl-8">
    <h2 class="sr-only">Details</h2>
    <div class="space-y-5">
      <div class="flex items-center space-x-2">
        <PaperAirplaneIcon
          class="h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
        <StageText
          v-if="journeyItem.stage"
          :stage="journeyItem.stage"
        />
      </div>
      <div class="flex items-center space-x-2">
        <StarIcon
          class="h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
        <span class="text-sm font-medium text-gray-900">
          {{ totalActivities }} activities
        </span>
      </div>
      <div class="flex items-center space-x-2">
        <CalendarIcon
          class="h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
        <span class="text-sm font-medium text-gray-900">
          Created on
          <time>{{ createdDateText }}</time>
        </span>
      </div>
    </div>
    <div class="mt-6 space-y-8 border-t border-gray-200 py-6">
      <div>
        <h2 class="text-sm font-medium text-gray-500 flex gap-2">
          <TagIcon class="w-5 h-5" />
          <span> Attributes </span>
        </h2>
        <ul
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
      </div>
      <div>
        <h2 class="text-sm font-medium text-gray-500 flex gap-2">
          <ChatBubbleLeftIcon class="w-5 h-5" />
          <span> Node Color </span>
        </h2>
        <div class="mt-2">
          <span
            v-if="!isEditing"
            class="inline-flex items-center rounded-full px-3 py-2 text-xs font-medium select-none cursor-pointer"
            :class="nodeColor"
          >
            {{ nodeColorName }}
          </span>
          <Dropdown
            class="w-full"
            v-else
            label=""
            empty-text="Select Color"
            :items="listColors"
            :model-value="colorValue"
            item-classes="flex gap-2"
            @update:model-value="(value) => $emit('update:colorValue', value)"
          >
            <template #custom-item="{ currentValue, item }">
              <span
                class="block w-20 h-5 rounded-full"
                :class="[colors[item.value].backgroundColor]"
              />
              <span class="font-medium">
                {{ item.text }}
              </span>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import StageText from '@/screens/InterviewJourneyView/components/Utils/StageText.vue';
import {
  CalendarIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/vue/24/outline';

import { Journey } from 'shared/entities/journey.entity';
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { computed } from 'vue';
import { getDisplayDate } from '@/utils/date';
import AttributeItem from '@/screens/InterviewJourneyView/components/Utils/AttributeItem.vue';
import { getNodeColor } from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyItem.methods';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { colors } from '@/constants/nodeColors';
import { DropdownItem } from '@/components/Dropdown/Dropdown.types';

type JourneyItemDetailMobileViewProps = {
  journey: Journey;
  journeyItem: JourneyItem;
  totalActivities: number;
  isEditing: boolean;
  colorValue: string;
};

type JourneyItemDetailMobileViewEmits = {
  (e: 'update:colorValue', value: string | number): void;
};

const props = defineProps<JourneyItemDetailMobileViewProps>();
const emits = defineEmits<JourneyItemDetailMobileViewEmits>();

const createdDateText = computed(() =>
  getDisplayDate(props.journeyItem.createdAt)
);

const nodeColorName = computed(() => {
  const color = props.journeyItem.color;

  return `${color.slice(0, 1).toUpperCase()}${color.slice(1)}`;
});

const nodeColor = computed(() => getNodeColor(props.journeyItem.color));

const listColors = computed<DropdownItem[]>(() =>
  Object.keys(colors).map((color) => ({
    text: colors[color].name,
    value: color,
  }))
);
</script>
