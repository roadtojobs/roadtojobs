<template>
  <a
    class="select-none relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
  >
    <div class="absolute flex flex-shrink-0 items-center justify-center">
      <span
        class="h-1.5 w-1.5 rounded-full"
        :class="{
          'bg-rose-500': color === 'rose',
          'bg-blue-500': color === 'blue',
          'bg-yellow-500': color === 'yellow',
          'bg-red-500': color === 'red',
          'bg-indigo-500': color === 'indigo',
          'bg-violet-500': color === 'violet',
          'bg-sky-500': color === 'sky',
          'bg-pink-500': color === 'pink',
        }"
        aria-hidden="true"
      />
    </div>
    <div class="ml-3 text-xs font-semibold text-gray-900">
      {{ text }}
    </div>
  </a>
</template>

<script setup lang="ts">
type AttributeItemProps = {
  text: string;
  color:
    | 'rose'
    | 'blue'
    | 'yellow'
    | 'red'
    | 'indigo'
    | 'violet'
    | 'sky'
    | 'pink'
    | string;
};

defineProps<AttributeItemProps>();
</script>
