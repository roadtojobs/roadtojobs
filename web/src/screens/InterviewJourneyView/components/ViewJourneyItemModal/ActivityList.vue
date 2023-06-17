<template>
  <!-- Activity feed-->
  <div class="flow-root">
    <ul
      role="list"
      class="-mb-8"
    >
      <li
        v-for="(activity, itemIdx) in activities"
        :key="activity.id"
      >
        <div class="relative pb-8">
          <span
            v-if="itemIdx !== activities.length - 1"
            class="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
          <div class="relative flex items-start space-x-3">
            <ActivityCreatedJourneyItem
              v-if="activity.type === 'CREATED_JOURNEY_ITEM'"
              :activity="activity"
            />
            <ActivityAddedNote
              v-else-if="activity.type === 'ADDED_NOTE'"
              :activity="activity"
            />
            <ActivityAttributes
              v-else-if="activity.type === 'ADDED_ATTRIBUTES'"
              type="ADDED"
              :activity="activity"
            />
            <ActivityAttributes
              v-else-if="activity.type === 'REMOVED_ATTRIBUTES'"
              type="REMOVED"
              :activity="activity"
            />
            <ActivityAdvanceToStage
              v-else-if="activity.type === 'ADVANCED_TO_STAGE'"
              :activity="activity"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="mt-6">
    <div class="flex space-x-3">
      <div class="flex-shrink-0">
        <div class="relative">
          <img
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
            src="../../../../assets/images/logo.png"
            alt=""
          />

          <span
            class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px"
          >
            <DocumentTextIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
      <div class="min-w-0 flex-1">
        <NoteCommentForm :journey-item="journeyItem" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentTextIcon } from '@heroicons/vue/24/outline';
import ActivityCreatedJourneyItem from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/ActivityItems/ActivityCreatedJourneyItem.vue';
import ActivityAddedNote from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/ActivityItems/ActivityAddedNote.vue';
import NoteCommentForm from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/NoteCommentForm.vue';
import ActivityAttributes from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/ActivityItems/ActivityAttributes.vue';
import ActivityAdvanceToStage from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/ActivityItems/ActivityAdvanceToStage.vue';
import { JourneyItemActivity } from 'shared/entities/journeyItemActivity.entity';
import { JourneyItem } from 'shared/entities/journeyItem.entity';

type ViewInterviewJourneyCompanyActivityListProps = {
  journeyItem: JourneyItem;
  activities: JourneyItemActivity[];
};

defineProps<ViewInterviewJourneyCompanyActivityListProps>();
</script>
