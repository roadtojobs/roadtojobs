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
                    Activity / Notes
                  </h2>
                </div>
                <div class="pt-6">
                  <!-- Activity feed-->
                  <div class="flow-root">
                    <ul
                      role="list"
                      class="-mb-8"
                    >
                      <li
                        v-for="(item, itemIdx) in activity"
                        :key="item.id"
                      >
                        <div class="relative pb-8">
                          <span
                            v-if="itemIdx !== activity.length - 1"
                            class="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                          <div class="relative flex items-start space-x-3">
                            <template v-if="item.type === 'comment'">
                              <div class="relative">
                                <img
                                  class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                  :src="item.imageUrl"
                                  alt=""
                                />

                                <span
                                  class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px"
                                >
                                  <ChatBubbleLeftEllipsisIcon
                                    class="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </div>
                              <div class="min-w-0 flex-1">
                                <div>
                                  <div class="text-sm">
                                    <a
                                      :href="item.person.href"
                                      class="font-medium text-gray-900"
                                      >{{ item.person.name }}</a
                                    >
                                  </div>
                                  <p class="mt-0.5 text-sm text-gray-500">
                                    Commented {{ item.date }}
                                  </p>
                                </div>
                                <div class="mt-2 text-sm text-gray-700">
                                  <p>{{ item.comment }}</p>
                                </div>
                              </div>
                            </template>
                            <template
                              v-else-if="item.type === 'assignment'"
                              condition="item.type === 'assignment'"
                            >
                              <div>
                                <div class="relative px-1">
                                  <div
                                    class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white"
                                  >
                                    <UserCircleIconMini
                                      class="h-5 w-5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="min-w-0 flex-1 py-1.5">
                                <div class="text-sm text-gray-500">
                                  <a
                                    :href="item.person.href"
                                    class="font-medium text-gray-900"
                                    >{{ item.person.name }}</a
                                  >
                                  {{ ' ' }}
                                  assigned
                                  {{ ' ' }}
                                  <a
                                    :href="item.assigned.href"
                                    class="font-medium text-gray-900"
                                    >{{ item.assigned.name }}</a
                                  >
                                  {{ ' ' }}
                                  <span class="whitespace-nowrap">{{
                                    item.date
                                  }}</span>
                                </div>
                              </div>
                            </template>
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
                                            :class="[
                                              tag.color,
                                              'h-1.5 w-1.5 rounded-full',
                                            ]"
                                            aria-hidden="true"
                                          />
                                        </span>
                                        <span
                                          class="ml-3 font-semibold text-gray-900"
                                          >{{ tag.name }}</span
                                        >
                                      </a>
                                      {{ ' ' }}
                                    </template>
                                  </span>
                                  <span class="whitespace-nowrap">{{
                                    item.date
                                  }}</span>
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
                            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                            alt=""
                          />

                          <span
                            class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px"
                          >
                            <ChatBubbleLeftEllipsisIcon
                              class="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                      <div class="min-w-0 flex-1">
                        <form action="#">
                          <div>
                            <label
                              for="comment"
                              class="sr-only"
                              >Comment</label
                            >
                            <textarea
                              id="comment"
                              name="comment"
                              rows="3"
                              class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                              placeholder="Leave a comment"
                            />
                          </div>
                          <div
                            class="mt-6 flex items-center justify-end space-x-4"
                          >
                            <button
                              type="button"
                              class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              <CheckCircleIcon
                                class="-ml-0.5 h-5 w-5 text-green-500"
                                aria-hidden="true"
                              />
                              Close issue
                            </button>
                            <button
                              type="submit"
                              class="inline-flex items-center justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                            >
                              Comment
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
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
import { computed } from 'vue';
import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';
import {
  PencilIcon,
  CalendarIcon,
  PaperAirplaneIcon,
  StarIcon,
} from '@heroicons/vue/24/outline';

type ViewCompanyModalProps = {
  interviewJourneyCompany: InterviewJourneyCompany;
  isOpen: boolean;
};

const props = defineProps<ViewCompanyModalProps>();

defineEmits<{
  (e: 'close'): void;
}>();

const title = computed(
  () => `The road to ${props.interviewJourneyCompany.company?.name} 🏃‍`
);

const activity = [
  {
    id: 1,
    type: 'comment',
    person: { name: 'Eduardo Benz', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
  {
    id: 2,
    type: 'assignment',
    person: { name: 'Hilary Mahy', href: '#' },
    assigned: { name: 'Kristin Watson', href: '#' },
    date: '2d ago',
  },
  {
    id: 3,
    type: 'tags',
    person: { name: 'Hilary Mahy', href: '#' },
    tags: [
      { name: 'Bug', href: '#', color: 'bg-rose-500' },
      { name: 'Accessibility', href: '#', color: 'bg-indigo-500' },
    ],
    date: '6h ago',
  },
  {
    id: 4,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
];
</script>
