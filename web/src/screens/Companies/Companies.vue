<template>
  <AppPage
    header-title="Companies"
    description="Manage your companies list 🏢"
  >
    <template #right-buttons>
      <AddCompanySlideOver @added="loadCompanies" />
    </template>
    <div class="flex items-center md:justify-end gap-2 mt-2 mb-4">
      <Input
        v-model="keyword"
        label=""
        placeholder="Input keyword to search"
        class="w-[20rem]"
        @keyup.enter="triggerSearch"
      />
      <Button
        class="mt-2"
        @click="triggerSearch"
      >
        Search
      </Button>
    </div>
    <AppTable
      :table="table"
      :records="companies"
      :is-loading="isLoading"
      empty-label="No company 👀"
    />
    <Pagination
      :total-pages="pageCount"
      :total-records="totalRecords"
      :current="page + 1"
      @go-to-page="(toPage) => table.setPageIndex(toPage - 1)"
    />
  </AppPage>
  <ViewCompanySlideOver
    :company="viewingCompany"
    @close="viewingCompany = null"
    @updated="reloadCompanies"
  />
  <ViewCompanyFinalNotesSlideOver
    :company="viewingCompanyNote"
    @close="viewingCompanyNote = null"
  />
</template>

<script setup lang="ts">
import AppPage from '@/components/AppPage/AppPage.vue';
import { setPageTitle } from '@/libraries/pageTitle';
import {
  createColumnHelper,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useVueTable,
} from '@tanstack/vue-table';
import { ref, onMounted } from 'vue';
import { Company } from 'shared';
import { companyRepo } from '@/repositories/company.repo';
import ViewCompanySlideOver from '@/screens/Companies/components/ViewCompanySlideOver.vue';
import { getActionButton } from '@/screens/Companies/Companies.methods';
import AddCompanySlideOver from '@/screens/Companies/components/AddCompanySlideOver.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import AppTable from '@/components/AppTable/AppTable.vue';
import ViewCompanyFinalNotesSlideOver from '@/screens/Companies/components/ViewCompanyFinalNotesSlideOver.vue';
import { useLoading } from '@/composable/useLoading';
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';

setPageTitle('Companies');

const viewingCompany = ref<Company | null>(null);
const viewingCompanyNote = ref<Company | null>(null);

const { startLoading, stopLoading, isLoading } = useLoading();
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
const keyword = ref('');

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
      cell: (info) =>
        getActionButton(info, onClickViewCompany, onClickViewNotes),
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

const triggerSearch = () => {
  if (isLoading.value) {
    return;
  }

  page.value = 0;
  loadCompanies();
};

const loadCompanies = async () => {
  if (isLoading.value) {
    return;
  }

  startLoading();

  const orderBy =
    sorting.value?.[0]?.id === 'countryCode' ? 'country_code' : 'name';
  const orderDirection = sorting.value?.[0]?.desc || false ? 'DESC' : 'ASC';

  const [remoteCompanies] = await Promise.all([
    companyRepo.getWithPagination({
      keyword: keyword.value || '',
      limit: perPage.value,
      page: page.value + 1,
      orderBy,
      orderDirection,
    }),
    countForPagination(),
  ]);

  companies.value = [...remoteCompanies];

  stopLoading();
};

const countForPagination = async () => {
  totalRecords.value = await companyRepo.countForPagination(
    keyword.value || ''
  );
  pageCount.value = Math.ceil(totalRecords.value / perPage.value);
};

const onClickViewCompany = (company: Company) => {
  viewingCompany.value = company;
};

const onClickViewNotes = (company: Company) => {
  viewingCompanyNote.value = company;
};

const reloadCompanies = (company: Company) => {
  loadCompanies();
  viewingCompany.value = {
    ...viewingCompany.value,
    ...company,
  };
};

onMounted(() => {
  loadCompanies();
});
</script>
