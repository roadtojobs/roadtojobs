<template>
  <aside class="hidden xl:block xl:pl-8">
    <h2 class="sr-only">Details</h2>
    <JourneyItemSpecs
      :stage-value="stageValue"
      :is-editing="isEditing"
      :journey-item="journeyItem"
      :total-activities="totalActivities"
      @update:stage-value="(value) => $emit('update:stageValue', value)"
    />
    <div class="mt-6 space-y-8 border-t border-gray-200 py-6">
      <JourneyItemAttributes
        :model-value="attributesValue"
        :journey-item="journeyItem"
        :is-editing="isEditing"
        @update:model-value="(value) => $emit('update:attributesValue', value)"
      />
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
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline';
import { Journey } from 'shared/entities/journey.entity';
import { DynamicAttributes } from 'shared/entities/journeyItem.entity';
import { computed } from 'vue';
import { getNodeColor } from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyItem.methods';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import { colors } from '@/constants/nodeColors';
import { DropdownItem } from '@/components/Dropdown/Dropdown.types';
import JourneyItemSpecs from '@/screens/InterviewJourneyView/components/Utils/JourneyItemSpecs.vue';
import { StrictJourneyItem } from '@/screens/InterviewJourneyView/composables/useViewJourneyItemModal';
import JourneyItemAttributes from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/EditModes/JourneyItemAttributes.vue';

type JourneyItemDetailMobileViewProps = {
  journey: Journey;
  journeyItem: StrictJourneyItem;
  totalActivities: number;
  isEditing: boolean;
  colorValue: string;
  stageValue: string;
  attributesValue: DynamicAttributes;
};

type JourneyItemDetailMobileViewEmits = {
  (e: 'update:colorValue', value: string | number): void;
  (e: 'update:stageValue', value: string | number): void;
  (e: 'update:attributesValue', value: DynamicAttributes): void;
};

const props = defineProps<JourneyItemDetailMobileViewProps>();
const emits = defineEmits<JourneyItemDetailMobileViewEmits>();

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
