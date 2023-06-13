<template>
  <Modal
    :is-open="isOpen"
    @close="$emit('close')"
    width-size="5xl"
  >
    <div class="flex-1 overflow-y-auto">
      <div class="xl:grid xl:max-w-5xl xl:grid-cols-3">
        <div class="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
          <div>
            <div>
              <div
                class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6"
              >
                <div>
                  <h1 class="text-2xl font-bold text-gray-900">
                    {{ title }}
                  </h1>
                  <p class="mt-2 text-sm text-gray-500">
                    #400 opened by
                    {{ ' ' }}
                    <a
                      href="#"
                      class="font-medium text-gray-900"
                      >Hilary Mahy</a
                    >
                    {{ ' ' }}
                    in
                    {{ ' ' }}
                    <a
                      href="#"
                      class="font-medium text-gray-900"
                      >Customer Portal</a
                    >
                  </p>
                </div>
                <div class="mt-4 flex space-x-3 md:mt-0">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <PencilIcon
                      class="-ml-0.5 h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                    Edit
                  </button>
                </div>
              </div>
              <aside class="mt-8 xl:hidden">
                <h2 class="sr-only">Details</h2>
                <div class="space-y-5">
                  <div class="flex items-center space-x-2">
                    <PaperAirplaneIcon
                      class="h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                    <StageText
                      v-if="interviewJourneyCompany.stage"
                      :stage="interviewJourneyCompany.stage"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <StarIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="text-sm font-medium text-gray-900">
                      {{ journeyActivities.length }} activities
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <CalendarIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="text-sm font-medium text-gray-900">
                      Created on
                      <time>{{ createdDateText }}</time>
                    </span>
                  </div>
                </div>
              </aside>
              <div class="py-3 xl:pb-0 xl:pt-6">
                <h2 class="sr-only">Description</h2>
                <div class="prose max-w-none">
                  {{ interviewJourneyCompany.description }}
                </div>
              </div>
            </div>
          </div>
          <section
            aria-labelledby="activity-title"
            class="mt-8 xl:mt-10"
          >
            <div>
              <div class="divide-y divide-gray-200">
                <div class="pb-4">
                  <h2
                    id="activity-title"
                    class="text-lg font-medium text-gray-900"
                  >
                    Activity Stream
                  </h2>
                </div>
                <div class="pt-6">
                  <ViewInterviewJourneyCompanyActivityList
                    :activities="journeyActivities"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <aside class="hidden xl:block xl:pl-8">
          <h2 class="sr-only">Details</h2>
          <div class="space-y-5">
            <div class="flex items-center space-x-2">
              <PaperAirplaneIcon
                class="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              <StageText
                v-if="interviewJourneyCompany.stage"
                :stage="interviewJourneyCompany.stage"
              />
            </div>
            <div class="flex items-center space-x-2">
              <StarIcon
                class="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              <span class="text-sm font-medium text-gray-900">
                {{ journeyActivities.length }} activities
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
                  v-for="(
                    attribute, index
                  ) in interviewJourneyCompany.attributes"
                  :key="`${index}-${attribute.text}`"
                  class="inline"
                >
                  <AttributeItem
                    :color="attribute.color"
                    :text="attribute.text"
                  />
                  {{ ' ' }}
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import { computed, onMounted } from 'vue';
import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';
import {
  PencilIcon,
  CalendarIcon,
  PaperAirplaneIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/vue/24/outline';
import {
  InterviewJourneyCompanyActivity,
  interviewJourneyCompanyActivityRepo,
} from '@/repositories/interviewJourneyCompanyActivity.repo';
import ViewInterviewJourneyCompanyActivityList from '@/screens/InterviewJourneyView/components/ViewInterviewJourneyCompanyModal/ViewInterviewJourneyCompanyActivityList.vue';
import AttributeItem from '@/screens/InterviewJourneyView/components/Utils/AttributeItem.vue';
import dayjs from 'dayjs';
import { DISPLAY_DATE_FORMAT } from '@/constants';
import StageText from '@/screens/InterviewJourneyView/components/Utils/StageText.vue';

type ViewCompanyModalProps = {
  interviewJourneyCompany: InterviewJourneyCompany;
  isOpen: boolean;
};

type ViewCompanyModalEmits = {
  (e: 'close'): void;
};

const props = defineProps<ViewCompanyModalProps>();
const emits = defineEmits<ViewCompanyModalEmits>();

const journeyActivities = ref<InterviewJourneyCompanyActivity[]>([]);

const title = computed(
  () => `The road to ${props.interviewJourneyCompany.company?.name} 🏃‍`
);

onMounted(async () => {
  const activities =
    await interviewJourneyCompanyActivityRepo.getByJourneyCompany(
      props.interviewJourneyCompany.id
    );

  journeyActivities.value = [...activities];
});

const createdDateText = computed(() =>
  dayjs(props.interviewJourneyCompany.createdAt).format(DISPLAY_DATE_FORMAT)
);
</script>
