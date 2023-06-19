<template>
  <div
    class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6"
  >
    <div>
      <h1 class="text-2xl font-bold text-gray-900">
        {{ title }}
      </h1>
      <p class="mt-2 text-sm text-gray-500">
        {{ `#${journeyItem.reference}` }} opened by
        {{ ' ' }}
        <a
          href="javascript:void(0);"
          class="font-medium text-gray-900"
        >
          you
        </a>
        {{ ' ' }}
        in
        {{ ' ' }}
        <a
          href="javascript:void(0)"
          class="font-medium text-gray-900"
        >
          {{ journey.name }}
        </a>
      </p>
    </div>
    <div class="mt-4 flex space-x-3 md:mt-0">
      <button
        v-if="!isEditing"
        @click="$emit('click-edit')"
        type="button"
        class="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <PencilIcon
          class="-ml-0.5 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
        Edit
      </button>
      <div
        v-else
        class="flex gap-2"
      >
        <Button
          type="secondary"
          :icon="XCircleIcon"
          @click="$emit('click-cancel')"
        >
          Cancel
        </Button>
        <Button :icon="DocumentCheckIcon"> Save </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PencilIcon,
  DocumentCheckIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline';
import { Journey } from 'shared/entities/journey.entity';
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { computed } from 'vue';
import Button from '@/components/Button/Button.vue';

type JourneyItemHeaderProps = {
  journey: Journey;
  journeyItem: JourneyItem;
  isEditing: boolean;
};

type JourneyItemHeaderEmits = {
  (e: 'click-edit'): void;
  (e: 'click-cancel'): void;
};

const props = defineProps<JourneyItemHeaderProps>();
defineEmits<JourneyItemHeaderEmits>();

const title = computed(
  () => `The road to ${props.journeyItem.company?.name} 🏃‍`
);
</script>
