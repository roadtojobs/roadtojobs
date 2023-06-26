<template>
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
            v-if="header.id === firstColumnId"
            class="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200"
          />
          <div
            v-if="header.id === firstColumnId"
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
      <tr v-if="!records.length">
        <td
          colspan="6"
          class="text-sm text-gray-500 py-4 text-center"
        >
          {{ emptyLabel }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts" generic="T">
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';
import { FlexRender, Table } from '@tanstack/vue-table';

type AppTableProps = {
  records: T[];
  table: Table<T>;
  firstColumnId: keyof T;
  emptyLabel?: string;
};

withDefaults(defineProps<AppTableProps>(), {
  emptyLabel: 'No record 👀',
});
</script>
