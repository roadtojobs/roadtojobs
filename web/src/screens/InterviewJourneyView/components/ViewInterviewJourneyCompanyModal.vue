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
                    <span class="text-sm font-medium text-green-700">
                      {{ interviewJourneyCompany.stage.name }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <StarIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="text-sm font-medium text-gray-900">
                      4 activities
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <CalendarIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="text-sm font-medium text-gray-900">
                      Created on
                      <time datetime="2020-12-02">Dec 2, 2020</time>
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
                class="h-5 w-5 text-yellow-500"
                aria-hidden="true"
              />
              <span class="text-sm font-medium text-yellow-700">
                {{ interviewJourneyCompany.stage.name }}
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <StarIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span class="text-sm font-medium text-gray-900">
                4 activities
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <CalendarIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span class="text-sm font-medium text-gray-900"
                >Created on <time datetime="2020-12-02">Dec 2, 2020</time></span
              >
            </div>
          </div>
          <div class="mt-6 space-y-8 border-t border-gray-200 py-6">
            <div>
              <h2 class="text-sm font-medium text-gray-500">Attributes</h2>
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
                  <a
                    class="select-none relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <div
                      class="absolute flex flex-shrink-0 items-center justify-center"
                    >
                      <span
                        class="h-1.5 w-1.5 rounded-full"
                        :class="{
                          'bg-rose-500': attribute.color === 'rose',
                          'bg-blue-500': attribute.color === 'blue',
                          'bg-yellow-500': attribute.color === 'yellow',
                          'bg-red-500': attribute.color === 'red',
                          'bg-indigo-500': attribute.color === 'indigo',
                          'bg-violet-500': attribute.color === 'violet',
                        }"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="ml-3 text-xs font-semibold text-gray-900">
                      {{ attribute.text }}
                    </div>
                  </a>
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
} from '@heroicons/vue/24/outline';
import {
  InterviewJourneyCompanyActivity,
  interviewJourneyCompanyActivityRepo,
} from '@/repositories/interviewJourneyCompanyActivity.repo';
import ViewInterviewJourneyCompanyActivityList from '@/screens/InterviewJourneyView/components/ViewInterviewJourneyCompanyModal/ViewInterviewJourneyCompanyActivityList.vue';

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
</script>
