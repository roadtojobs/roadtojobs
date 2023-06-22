<template>
  <div class="bg-white py-20 sm:py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          The Road To Jobs 🏎️ 💼
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Just as every journey holds significance, the same can be said for the
          numerous interview journeys throughout your lifetime 🌊.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="flex flex-col"
          >
            <dt class="text-base font-semibold leading-7 text-rose-700">
              <div
                class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-600"
              >
                <component
                  :is="feature.icon"
                  class="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              {{ feature.name }}
            </dt>
            <dd
              class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600"
            >
              <p
                class="flex-auto"
                v-text="feature.description"
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ClipboardDocumentCheckIcon,
  RocketLaunchIcon,
  PaperAirplaneIcon,
  ListBulletIcon,
  XMarkIcon,
  DocumentIcon,
} from '@heroicons/vue/24/outline';
import { setPageTitle } from '@/libraries/pageTitle';

const features = [
  {
    name: 'Keep track of every journey',
    description: `
      Make it a point to diligently record and monitor every aspect of your interview journey with each company.
    `,
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'Note on everything',
    description: `
      Take note of both the negative and positive experiences, as well as areas for improvement
    `,
    icon: DocumentIcon,
  },
  {
    name: 'The note for future',
    description: `
      By documenting these details today, you can pave the way for a better tomorrow.
    `,
    icon: RocketLaunchIcon,
  },
  {
    name: 'Manage your Companies list',
    description: `
      The first priority, the go-to, the good, the bad, the avoid-list,...
      Manage them in your point of view.
    `,
    icon: ListBulletIcon,
  },
  {
    name: 'Avoid future mistakes',
    description: `
      We all have mistakes, that's inevitable. But we can prevent it by proper notes and analytics.
      Road To Jobs would do that for you!
    `,
    icon: XMarkIcon,
  },
  {
    name: 'Start Interview',
    description: `
      With the super platform support from Road To Jobs, start interview now and do your bests!
    `,
    icon: PaperAirplaneIcon,
  },
];

setPageTitle('Dashboard');
</script>
