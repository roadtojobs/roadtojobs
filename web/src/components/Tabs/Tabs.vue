<template>
  <div class="tab-header">
    <div class="sm:hidden">
      <label
        for="tabs"
        class="sr-only"
      >
        Select a tab
      </label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option
          v-for="tab in tabs"
          :key="tab.id"
          :selected="tab.id === currentTabId"
        >
          {{ tab.label }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav
          class="-mb-px flex space-x-8"
          aria-label="Tabs"
        >
          <a
            v-for="tab in tabs"
            :key="tab.id"
            href="javascript:void(0)"
            :class="[
              tab.id === currentTabId
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium',
            ]"
            :aria-current="tab.id === currentTabId ? 'page' : undefined"
            @click="onClickChangeTab(tab)"
          >
            <component
              :is="tab.icon"
              :class="[
                tab.id === currentTabId
                  ? 'text-rose-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                '-ml-0.5 mr-2 h-5 w-5',
              ]"
              aria-hidden="true"
            />
            <span>{{ tab.label }}</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
  <div class="tab-body">
    <slot :name="currentTabId" />
  </div>
</template>

<script setup lang="ts">
import { TabItem } from '@/components/Tabs/Tabs.methods';
import { ref } from 'vue';

const props = defineProps<{
  tabs: TabItem[];
  firstTab?: string;
}>();

const currentTabId = ref<string>(props.firstTab || props.tabs[0].id);

const onClickChangeTab = (tabItem: TabItem) => {
  currentTabId.value = tabItem.id;
};
</script>
