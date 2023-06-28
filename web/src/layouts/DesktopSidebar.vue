<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6"
    >
      <div class="flex h-16 shrink-0 items-center justify-center">
        <img
          class="h-8 w-auto"
          src="@/assets/images/logo.png"
          alt="Road to Jobs"
        />
      </div>
      <nav class="flex flex-1 flex-col">
        <ul
          role="list"
          class="flex flex-1 flex-col gap-y-7"
        >
          <li>
            <ul
              role="list"
              class="-mx-2 space-y-1"
            >
              <li
                v-for="item in menuItems"
                :key="item.id"
              >
                <a
                  href="javascript:void(0)"
                  :class="[
                    item.id === activeMenuItem?.id
                      ? 'bg-gray-50 text-rose-600'
                      : 'text-gray-700 hover:text-rose-600 hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                  ]"
                  :data-testid="item.id"
                  @click="onMenuItemClick(item)"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.id === activeMenuItem?.id
                        ? 'text-rose-600'
                        : 'text-gray-400 group-hover:text-rose-600',
                      'h-6 w-6 shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
          <li class="-mx-6 mt-auto">
            <a
              href="https://github.com/roadtojobs/roadtojobs"
              target="_blank"
              class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
            >
              <img
                class="h-8 w-8 rounded-full border bg-gray-50"
                src="@/assets/images/github.svg"
                alt="RoadToJobs GitHub"
              />
              <span class="sr-only">GitHub</span>
              <span aria-hidden="true"> RoadToJobs/RoadToJobs </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuItem } from '@/types/layout';
import useMenuItemClick from '@/layouts/components/useMenuItemClick';

defineProps<{
  menuItems: MenuItem[];
  activeMenuItem: MenuItem | null;
}>();

const emit = defineEmits<{
  (e: 'selected', menuItem: MenuItem): void;
}>();

const { onMenuItemClick } = useMenuItemClick({
  onBeforeHandle(menuItem: MenuItem) {
    emit('selected', menuItem);
  },
});
</script>
