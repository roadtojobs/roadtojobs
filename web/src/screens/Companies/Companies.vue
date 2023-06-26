<template>
  <AppPage
    header-title="Companies"
    description="Manage your companies list 🏢"
  >
    <template #right-buttons>
      <AddCompanySlideOver @added="loadCompanies" />
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
    <Pagination
      :total="totalRecords"
      :from="page * perPage + 1"
      :to="
        (page + 1) * perPage < totalRecords
          ? (page + 1) * perPage
          : totalRecords
      "
      @next="table.nextPage()"
      @prev="table.previousPage()"
    />
  </AppPage>
  <ViewCompanySlideOver
    :company="viewingCompany"
    @close="viewingCompany = null"
    @updated="reloadCompanies"
  />
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { setPageTitle } from '@/libraries/pageTitle';
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useVueTable,
} from '@tanstack/vue-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { Company } from 'shared';
import { companyRepo } from '@/repositories/company.repo';
import ViewCompanySlideOver from '@/screens/Companies/components/ViewCompanySlideOver.vue';
import { getActionButton } from '@/screens/Companies/Companies.methods';
import AddCompanySlideOver from '@/screens/Companies/components/AddCompanySlideOver.vue';
import Pagination from '@/components/Pagination/Pagination.vue';

setPageTitle('Companies');

const router = useRouter();

const viewingCompany = ref<Company | null>(null);

const companies = ref<Company[]>([]);
const columnHelper = createColumnHelper<Company>();
const pageCount = ref(0);
const totalRecords = ref(0);
const perPage = ref(20);
const page = ref(0);
const sorting = ref<SortingState>([]);
const paginating = ref<PaginationState>({
  pageIndex: page.value,
  pageSize: perPage.value,
});

const table = useVueTable<Company>({
  manualPagination: true,
  manualSorting: true,
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
      cell: (info) => getActionButton(info, onClickViewCompany),
    }),
  ],
  get data() {
    return companies.value;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get pagination() {
      return paginating.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue;

    loadCompanies();
  },
  getCoreRowModel: getCoreRowModel(),
  get pageCount() {
    return pageCount.value;
  },
  onPaginationChange(updaterOrValue) {
    paginating.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(paginating.value)
        : updaterOrValue;

    page.value = paginating.value.pageIndex;
    loadCompanies();
  },
});

const loadCompanies = async () => {
  const orderBy =
    sorting.value?.[0]?.id === 'countryCode' ? 'country_code' : 'name';
  const orderDirection = sorting.value?.[0]?.desc || false ? 'DESC' : 'ASC';

  const remoteCompanies = await companyRepo.getWithPagination({
    keyword: '',
    limit: perPage.value,
    page: page.value + 1,
    orderBy,
    orderDirection,
  });

  companies.value = [...remoteCompanies];
};

const countForPagination = async () => {
  totalRecords.value = await companyRepo.countForPagination('');
  pageCount.value = Math.ceil(totalRecords.value / perPage.value);
};

const onClickViewCompany = (company: Company) => {
  viewingCompany.value = company;
};

const reloadCompanies = (company: Company) => {
  loadCompanies();
  viewingCompany.value = {
    ...viewingCompany.value,
    ...company,
  };
};

onMounted(async () => {
  await countForPagination();
  await loadCompanies();
});
</script>
