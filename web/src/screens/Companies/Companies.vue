<template>
  <AppPage
    header-title="Companies"
    description="Your companies list 🏢"
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
        <tr v-if="!companies.length">
          <td
            colspan="6"
            class="text-sm text-gray-500 py-4 text-center"
          >
            No company👀
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
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useVueTable,
} from '@tanstack/vue-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import CreateNewJourney from '@/screens/InterviewJourneysList/components/CreateNewJourney.vue';
import { Company } from 'shared';
import { companyRepo } from '@/repositories/company.repo';

setPageTitle('Companies');

const router = useRouter();
const companies = ref<Company[]>([]);
const sorting = ref<SortingState>([]);

const columnHelper = createColumnHelper<Company>();

const pageCount = 20;

const table = useVueTable<Company>({
  pageCount,
  columns: [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Company Name',
    }),
    columnHelper.accessor('homepage', {
      header: 'Home page',
      enableSorting: false,
    }),
    columnHelper.accessor('countryCode', {
      header: 'Country',
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (info) => null,
    }),
  ],
  get data() {
    return companies.value;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    console.log(sorting.value);
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});

const page = ref(1);

const loadCompanies = async () => {
  const orderBy =
    sorting.value?.[0]?.id === 'countryCode' ? 'country_code' : 'name';
  const orderDirection = sorting.value?.[0]?.desc || false ? 'DESC' : 'ASC';

  const remoteCompanies = await companyRepo.getWithPagination({
    keyword: '',
    limit: pageCount,
    page: page.value,
    orderBy,
    orderDirection,
  });

  companies.value = [...remoteCompanies];
};

onMounted(loadCompanies);
</script>
