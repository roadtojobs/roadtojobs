<template>
  <div class="flex gap-2">
    <div>
      <div class="relative px-1">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white"
        >
          <UserCircleIcon
            class="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
    <div class="min-w-0 flex-1 py-1.5">
      <div class="text-sm text-gray-500">
        <a
          href="javascript:void(0);"
          class="font-medium text-gray-900"
        >
          You
        </a>
        {{ ' ' }}
        added the
        {{ ' ' }}
        <a
          href="javascript:void(0);"
          class="font-medium text-gray-900"
          title="Click to view"
          @click="isOpenModal = true"
        >
          Final Note 📝
        </a>
        {{ ' ' }}
        <span class="whitespace-nowrap">{{ createdDateText }}</span>
      </div>
    </div>
  </div>
  <ViewFinalNoteModal
    v-if="activity.companyNote"
    :is-open="isOpenModal"
    :company-note="activity.companyNote"
    :journey-item="journeyItem"
    @close="isOpenModal = false"
  />
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { getFromAgoTime } from '@/utils/date';
import { JourneyItemActivity } from 'shared/entities/journeyItemActivity.entity';
import ViewFinalNoteModal from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/Utils/ViewFinalNoteModal.vue';
import { JourneyItem } from 'shared/entities';

const props = defineProps<{
  activity: JourneyItemActivity;
  journeyItem: JourneyItem;
}>();

const createdDateText = computed(() =>
  getFromAgoTime(props.activity.createdAt)
);

const isOpenModal = ref(false);
</script>
