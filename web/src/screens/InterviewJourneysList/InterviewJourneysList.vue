<template>
  <AppPage
    header-title="Interview Journeys"
    description="All of your Interview Journeys are here"
  >
    <table class="w-full text-left">
      <thead class="bg-white">
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colspan="header.colSpan"
            :class="[
              header.column.getCanSort() ? 'cursor-pointer select-none' : '',
            ]"
            scope="col"
            class="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <div class="flex gap-1" v-if="!header.isPlaceholder">
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />

              <span>
                <component
                  v-show="header.column.getIsSorted() === 'asc'"
                  class="h-4 w-4 shrink-0"
                  :is="ChevronUpIcon"
                />
                <component
                  v-show="header.column.getIsSorted() === 'desc'"
                  class="h-4 w-4 shrink-0"
                  :is="ChevronDownIcon"
                />
              </span>
            </div>
            <div
              v-if="header.id === 'name'"
              class="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200"
            />
            <div
              v-if="header.id === 'name'"
              class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in []" :key="person.email">
          <td class="relative py-4 pr-3 text-sm font-medium text-gray-900">
            {{ person.name }}
            <div
              class="absolute bottom-0 right-full h-px w-screen bg-gray-100"
            />
            <div class="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
          </td>
          <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
            {{ person.title }}
          </td>
          <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
            {{ person.email }}
          </td>
          <td class="px-3 py-4 text-sm text-gray-500">{{ person.role }}</td>
          <td class="relative py-4 pl-3 text-right text-sm font-medium">
            <a href="#" class="text-indigo-600 hover:text-indigo-900"
              >Edit<span class="sr-only">, {{ person.name }}</span></a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { setPageTitle } from '@/libraries/pageTitle';
import {
  InterviewJourney,
  interviewJourneyRepo,
} from '@/repositories/interviewJourney.repo';
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useVueTable,
} from '@tanstack/vue-table';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';

const interviewJourneys = ref<InterviewJourney[]>([]);
const sorting = ref<SortingState>([]);

const columnHelper = createColumnHelper<InterviewJourney>();

const table = useVueTable<InterviewJourney>({
  columns: [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Journey Name',
    }),
    columnHelper.accessor('description', {
      header: 'Description',
    }),
    columnHelper.accessor('started_at', {
      header: 'Started At',
      cell: (info) => dayjs(info.getValue()).format(DATE_FORMAT),
    }),
    columnHelper.accessor('ended_at', {
      header: 'Ended At',
      cell: (info) =>
        info.getValue() ? dayjs(info.getValue()).format(DATE_FORMAT) : '-',
    }),
  ],
  get data() {
    return interviewJourneys.value;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});

setPageTitle('Interview Journeys');

onMounted(async () => {
  console.log(await interviewJourneyRepo.getAll());
});
</script>
