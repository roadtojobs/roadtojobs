<template>
  <AppPage
    header-title="Companies"
    description="Manage your companies list 🏢"
  >
    <template #right-buttons>
      <AddCompanySlideOver @added="loadCompanies" />
    </template>
    <AppTable
      :table="table"
      :records="companies"
      empty-label="No company 👀"
    />
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
import AppTable from '@/components/AppTable/AppTable.vue';
import ViewCompanyFinalNotesSlideOver from '@/screens/Companies/components/ViewCompanyFinalNotesSlideOver.vue';

setPageTitle('Companies');

const router = useRouter();

const viewingCompany = ref<Company | null>(null);
const viewingCompanyNote = ref<Company | null>(null);

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

onMounted(async () => {
  await countForPagination();
  await loadCompanies();
});
</script>
