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
    <AppTable
      :records="interviewJourneys"
      :table="table"
      empty-label="No journey here, let's create one 🚀"
    />
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
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';
import Button from '@/components/Button/Button.vue';
import { useRouter } from 'vue-router';
import { VNode, ref, onMounted } from 'vue';
import CreateNewJourney from '@/screens/InterviewJourneysList/components/CreateNewJourney.vue';
import { pickThingId } from '@/utils/surrealThing';
import { Journey } from 'shared/entities/journey.entity';
import ArchiveJourneyButton from '@/screens/Shared/components/ArchiveJourneyButton.vue';
import ToggleButton from '@/components/ToggleButton/ToggleButton.vue';
import { getDisplayDate } from '@/utils/date';
import UnarchiveJourneyButton from '@/screens/Shared/components/UnarchiveJourneyButton.vue';
import AppTable from '@/components/AppTable/AppTable.vue';

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
      cell: (info) => getDisplayDate(info.getValue()),
    }),
    columnHelper.accessor('endedAt', {
      header: 'Ended At',
      cell: (info) => (info.getValue() ? getDisplayDate(info.getValue()) : '-'),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (info) => getDisplayDate(info.getValue()),
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
          !canArchive &&
            h(UnarchiveJourneyButton, {
              journey,
              onUnarchived: () => loadAllJourneys(isIncludingArchive.value),
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
