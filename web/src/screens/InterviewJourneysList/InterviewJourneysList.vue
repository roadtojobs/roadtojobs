<template>
  <AppPage
    header-title="Interview Journeys"
    description="Manage your Road To Jobs / Interview Journeys here"
  >
    <template #right-buttons>
      <CreateNewJourney />
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
              class="flex gap-1"
              v-if="!header.isPlaceholder"
            >
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
        <tr
          v-for="row in table.getRowModel().rows.slice(0, 10)"
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
import { VNode } from 'vue';
import CreateNewJourney from '@/screens/InterviewJourneysList/components/CreateNewJourney.vue';

setPageTitle('Interview Journeys');

const router = useRouter();
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

onMounted(async () => {
  interviewJourneys.value = [...(await interviewJourneyRepo.getAll())];
});

function renderActionItems(
  info: CellContext<InterviewJourney, unknown>
): VNode {
  const viewButton = h(
    Button,
    {
      onClick: () => {
        const rawId = info.row.original.id;
        const stringId = rawId.split(':')[1];
        router.push({
          name: 'interview-journey-view',
          params: { id: stringId },
        });
      },
    },
    () => [h('span', 'View')]
  );
  const archiveButton = h(
    Button,
    {
      onClick: () => console.log('TBI'),
      type: 'warning',
    },
    () => [h('span', 'Archive')]
  );

  return h({
    functional: true,
    render() {
      return h(
        'div',
        {
          className: 'flex gap-1',
        },
        [viewButton, archiveButton]
      );
    },
  });
}
</script>
