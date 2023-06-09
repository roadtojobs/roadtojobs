<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="handleClose(true)">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full justify-center p-4 text-center items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full"
              :class="[
                widthSize === 'lg' ? 'sm:max-w-lg' : '',
                widthSize === 'xl' ? 'sm:max-w-xl' : '',
                widthSize === '2xl' ? 'sm:max-w-2xl' : '',
                widthSize === '3xl' ? 'sm:max-w-3xl' : '',
                widthSize === '4xl' ? 'sm:max-w-4xl' : '',
                widthSize === '5xl' ? 'sm:max-w-5xl' : '',
                widthSize === 'max' ? 'sm:max-w-full' : '',
              ]"
            >
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="handleClose(false)"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="mt-3 sm:ml-4 sm:mt-0 text-left">
                  <DialogTitle
                    v-if="title"
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                  >
                    {{ title }}
                  </DialogTitle>
                  <div class="mt-2">
                    <slot />
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 flex gap-2 flex-row-reverse sm:px-6"
              >
                <slot name="bottom-buttons" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

type ModalProps = {
  isOpen: boolean;
  title?: string;
  widthSize?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'max';
  wantsCloseOnClickOutside?: boolean;
};

const props = withDefaults(defineProps<ModalProps>(), {
  isOpen: false,
  widthSize: 'lg',
  wantsCloseOnClickOutside: true,
});

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const handleClose = (isOutsideClick: boolean) => {
  if (isOutsideClick && !props.wantsCloseOnClickOutside) {
    return;
  }

  emits('close');
};
</script>
