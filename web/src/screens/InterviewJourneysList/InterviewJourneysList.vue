<template>
  <AppPage
    header-title="Interview Journeys"
    description="Manage your Road To Jobs / Interview Journeys 💼"
  >
    <template #right-buttons>
      <CreateNewJourney />
    </template>
    <template #before-body>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4 mt-1">
        <ToggleButton
          :model-value="isIncludingArchive"
          label="Include Archived"
          @update:model-value="toggleArchive"
        />
      </div>
    </template>
    <table class="min-w-full">
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
            <div
              v-if="!header.isPlaceholder"
              class="flex gap-1"
            >
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />

              <span>
                <component
                  :is="ChevronUpIcon"
                  v-show="header.column.getIsSorted() === 'asc'"
                  class="h-4 w-4 shrink-0"
                />
                <component
                  :is="ChevronDownIcon"
                  v-show="header.column.getIsSorted() === 'desc'"
                  class="h-4 w-4 shrink-0"
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
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <td
            v-for="(cell, index) in row.getVisibleCells()"
            :key="cell.id"
            class="relative py-4 pr-3 text-sm font-medium text-gray-900"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
            <div
              v-if="index === 0"
              class="absolute bottom-0 right-full h-px w-screen bg-gray-100"
            />
            <div
              v-if="index === 0"
              class="absolute bottom-0 left-0 h-px w-screen bg-gray-100"
            />
          </td>
        </tr>
        <tr v-if="!interviewJourneys.length">
          <td
            colspan="6"
            class="text-sm text-gray-500 py-4 text-center"
          >
            No journey here, let's create one 🚀
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pb-32"></div>
  </AppPage>
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { setPageTitle } from '@/libraries/pageTitle';
import { journeyRepo } from '@/repositories/journey.repo';
import {
  CellContext,
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
import Button from '@/components/Button/Button.vue';
import { useRouter } from 'vue-router';
import { VNode, ref, onMounted } from 'vue';
import CreateNewJourney from '@/screens/InterviewJourneysList/components/CreateNewJourney.vue';
import { pickThingId } from '@/utils/surrealThing';
import { Journey } from 'shared/entities/journey.entity';
import ArchiveJourneyButton from '@/screens/Shared/components/ArchiveJourneyButton.vue';
import ToggleButton from '@/components/ToggleButton/ToggleButton.vue';

setPageTitle('Interview Journeys');

const router = useRouter();
const interviewJourneys = ref<Journey[]>([]);
const sorting = ref<SortingState>([]);
const isIncludingArchive = ref(false);

const columnHelper = createColumnHelper<Journey>();

const table = useVueTable<Journey>({
  columns: [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Journey Name',
    }),
    columnHelper.accessor('totalJourneyItems', {
      header: 'Num. of Companies',
    }),
    columnHelper.accessor('startedAt', {
      header: 'Started At',
      cell: (info) => dayjs(info.getValue()).format(DATE_FORMAT),
    }),
    columnHelper.accessor('endedAt', {
      header: 'Ended At',
      cell: (info) =>
        info.getValue() ? dayjs(info.getValue()).format(DATE_FORMAT) : '-',
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (info) => dayjs(info.getValue()).format(DATE_FORMAT),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (info) => renderActionItems(info),
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

const loadAllJourneys = async (includeArchived = false) => {
  const journeys = await journeyRepo.getAll(!includeArchived);
  interviewJourneys.value = [...journeys];
};

onMounted(loadAllJourneys);

function renderActionItems(info: CellContext<Journey, unknown>): VNode {
  const journey = info.row.original;

  const viewButton = h(
    Button,
    {
      onClick: () =>
        router.push({
          name: 'interview-journey-view',
          params: { id: pickThingId(journey.id) },
        }),
    },
    () => [h('span', 'View')]
  );

  const canArchive = !journey.archivedAt;

  return h({
    functional: true,
    render() {
      return h(
        'div',
        {
          className: 'flex gap-1',
        },
        [
          viewButton,
          canArchive &&
            h(ArchiveJourneyButton, {
              journey,
              onArchived: () => loadAllJourneys(isIncludingArchive.value),
            }),
        ]
      );
    },
  });
}

const toggleArchive = (value: boolean) => {
  isIncludingArchive.value = value;
  loadAllJourneys(isIncludingArchive.value);
};
</script>
