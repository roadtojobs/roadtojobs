<template>
  <div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="sm:flex sm:items-center lg:pb-6 pb-2"
        :class="[borderless ? '' : 'border-b']"
      >
        <div class="sm:flex-auto">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {{ headerTitle }}
          </h1>
          <p
            class="mt-2 leading-8"
            :class="[descriptionTextClass]"
          >
            {{ description }}
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <slot name="right-buttons" />
        </div>
      </div>
    </div>
    <div
      class="flow-root overflow-hidden"
      :class="bodyMargin"
    >
      <slot name="before-body" />
      <div :class="[bodyClasses]">
        <slot />
      </div>
      <slot name="after-body" />
    </div>
  </div>
</template>

<script setup lang="ts">
type AppPageProps = {
  headerTitle: string;
  description?: string;
  descriptionTextClass?: string;
  borderless?: boolean;
  bodyMargin?: string;
  bodyClasses?: string;
};

withDefaults(defineProps<AppPageProps>(), {
  bodyMargin: 'mt-8',
  descriptionTextClass: 'text-md text-gray-500',
  bodyClasses: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
});
</script>
