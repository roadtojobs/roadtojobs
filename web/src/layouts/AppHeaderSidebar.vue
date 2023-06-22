<template>
  <TransitionRoot
    as="template"
    :show="sidebarOpen"
  >
    <Dialog
      as="div"
      class="relative z-50 lg:hidden"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div
                class="absolute left-full top-0 flex w-16 justify-center pt-5"
              >
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon
                    class="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </TransitionChild>
            <MobileSidebar
              :menu-items="menuItems"
              :active-menu-item="activeMenuItem"
              @selected="onSelectedMenuItem"
            />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <DesktopSidebar
    :menu-items="menuItems"
    :active-menu-item="activeMenuItem"
    @selected="onSelectedMenuItem"
  />

  <div
    class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
  >
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      @click="sidebarOpen = true"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon
        class="h-6 w-6"
        aria-hidden="true"
      />
    </button>
    <div class="flex-1 text-sm font-semibold leading-6 text-gray-900">
      Road To Jobs
    </div>
    <a href="https://github.com/roadtojobs/roadtojobs">
      <span class="sr-only">Your profile</span>
      <img
        class="h-8 w-8 rounded-full border bg-gray-50"
        src="@/assets/images/github.svg"
        alt="RoadToJobs GitHub"
      />
    </a>
  </div>
</template>
<script setup lang="ts">
import {
  Bars3Icon,
  ChartPieIcon,
  HomeIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  BuildingOffice2Icon,
} from '@heroicons/vue/24/outline';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ref } from 'vue';
import DesktopSidebar from '@/layouts/DesktopSidebar.vue';
import MobileSidebar from '@/layouts/MobileSidebar.vue';
import { MenuItem } from '@/types/layout';
import { useRouter } from 'vue-router';

const router = useRouter();
const sidebarOpen = ref(false);

const activeMenuItem = ref<MenuItem | null>(null);

const menuItems = ref<MenuItem[]>([
  {
    id: 'dashboard',
    name: 'Dashboard',
    routeName: 'dashboard',
    icon: HomeIcon,
  },
  {
    id: 'interview-journey',
    name: 'Interview Journeys',
    routeName: 'interview-journey',
    icon: ClipboardDocumentCheckIcon,
    childRoutes: ['interview-journey-view'],
  },
  {
    id: 'companies',
    name: 'Companies',
    routeName: 'companies',
    icon: BuildingOffice2Icon,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    routeName: 'analytics',
    icon: ChartPieIcon,
  },
]);

onMounted(async () => {
  await router.isReady();
  const currentRouteName = String(router.currentRoute.value.name);

  menuItems.value.forEach((menuItem) => {
    if (
      currentRouteName !== menuItem.routeName &&
      !menuItem.childRoutes?.includes(currentRouteName)
    ) {
      return;
    }

    onSelectedMenuItem(menuItem);
  });
});

const onSelectedMenuItem = (menuItem: MenuItem) => {
  activeMenuItem.value = {
    ...menuItem,
  };
};
</script>
