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
            <template v-else>
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
                      :href="item.person.href"
                      class="font-medium text-gray-900"
                      >{{ item.person.name }}</a
                    >
                    {{ ' ' }}
                    added tags
                  </span>
                  {{ ' ' }}
                  <span class="mr-0.5">
                    <template
                      v-for="tag in item.tags"
                      :key="tag.name"
                    >
                      <a
                        :href="tag.href"
                        class="relative inline-flex items-center rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <span
                          class="absolute flex flex-shrink-0 items-center justify-center"
                        >
                          <span
                            :class="[tag.color, 'h-1.5 w-1.5 rounded-full']"
                            aria-hidden="true"
                          />
                        </span>
                        <span class="ml-3 font-semibold text-gray-900">{{
                          tag.name
                        }}</span>
                      </a>
                      {{ ' ' }}
                    </template>
                  </span>
                  <span class="whitespace-nowrap">{{ item.date }}</span>
                </div>
              </div>
            </template>
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
        <ViewInterviewJourneyCompanyCommentForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentTextIcon } from '@heroicons/vue/24/outline';
import { InterviewJourneyCompanyActivity } from '@/repositories/interviewJourneyCompanyActivity.repo';
import ActivityCreatedJourneyItem from '@/screens/InterviewJourneyView/components/ActivityItems/ActivityCreatedJourneyItem.vue';
import ActivityAddedNote from '@/screens/InterviewJourneyView/components/ActivityItems/ActivityAddedNote.vue';
import ViewInterviewJourneyCompanyCommentForm from '@/screens/InterviewJourneyView/components/ViewInterviewJourneyCompanyModal/ViewInterviewJourneyCompanyCommentForm.vue';

type ViewInterviewJourneyCompanyActivityListProps = {
  activities: InterviewJourneyCompanyActivity[];
};

defineProps<ViewInterviewJourneyCompanyActivityListProps>();
</script>
