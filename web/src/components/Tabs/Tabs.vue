<template>
  <div class="tab-header">
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
  <div class="tab-body">
    <slot :name="currentTabId" />
  </div>
</template>

<script setup lang="ts">
import { TabItem } from '@/components/Tabs/Tabs.methods';
import { ref } from 'vue';

type TabsProps = {
  tabs: TabItem[];
  firstTab?: string;
  usesTabParams?: boolean;
  tabParamName?: string;
};

type TabsEmits = {
  (e: 'selected-tab', tab: TabItem): void;
};

const props = defineProps<TabsProps>();
const emits = defineEmits<TabsEmits>();

const getCurrentUrl = () => new URL(window.location.href);

const getInitTab = () => {
  const url = getCurrentUrl();

  if (
    props.usesTabParams &&
    props.tabParamName &&
    url.searchParams.get(props.tabParamName)
  ) {
    return url.searchParams.get(props.tabParamName);
  }

  return props.firstTab || props.tabs[0].id;
};

const currentTabId = ref<string>(getInitTab());

const onClickChangeTab = (tabItem: TabItem) => {
  currentTabId.value = tabItem.id;
  emits('selected-tab', tabItem);

  if (props.usesTabParams) {
    const url = getCurrentUrl();
    url.searchParams.set(props.tabParamName || '', tabItem.id);
    window.history.replaceState({}, '', url);
  }
};
</script>
