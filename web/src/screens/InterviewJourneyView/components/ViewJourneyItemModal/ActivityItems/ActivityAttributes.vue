<template>
  <div>
    <div class="relative px-1">
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white"
      >
        <TagIcon
          class="h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
  <div class="min-w-0 flex-1 py-0">
    <div class="text-sm leading-8 text-gray-500">
      <span class="mr-0.5">
        <a
          href="javascript:void(0)"
          class="font-medium text-gray-900"
        >
          You
        </a>
        {{ ' ' }}
        {{ type === 'ADDED' ? 'added' : 'removed' }} attributes
      </span>
      {{ ' ' }}
      <span class="mr-0.5">
        <template
          v-for="(tag, index) in activity.attributes"
          :key="`${tag.text}-${index}`"
        >
          <AttributeItem
            :color="tag.color"
            :text="tag.text"
          />
          {{ ' ' }}
        </template>
      </span>
      <span class="whitespace-nowrap">{{ createdDateText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TagIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import AttributeItem from '@/screens/InterviewJourneyView/components/Utils/AttributeItem.vue';
import { getFromAgoTime } from '@/utils/date';
import { JourneyItemActivity } from 'shared/entities/journeyItemActivity.entity';

const props = defineProps<{
  activity: JourneyItemActivity;
  type: 'ADDED' | 'REMOVED';
}>();

const createdDateText = computed(() =>
  getFromAgoTime(props.activity.createdAt)
);
</script>
