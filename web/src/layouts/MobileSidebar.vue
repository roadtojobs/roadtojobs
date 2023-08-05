<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
    <div class="flex h-16 shrink-0 items-center">
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
        <li>
          <LatestJourneyBox v-if="currentUser.isUserReady" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { MenuItem } from '@/types/layout';
import useMenuItemClick from '@/layouts/composables/useMenuItemClick';
import LatestJourneyBox from '@/layouts/components/LatestJourneyBox.vue';
import { useCurrentUser } from '@/stores/useCurrentUser';

defineProps<{
  menuItems: MenuItem[];
  activeMenuItem: MenuItem | null;
}>();

const emit = defineEmits<{
  (e: 'selected', menuItem: MenuItem): void;
}>();

const currentUser = useCurrentUser();

const { onMenuItemClick } = useMenuItemClick({
  onBeforeHandle(menuItem: MenuItem) {
    emit('selected', menuItem);
  },
});
</script>
