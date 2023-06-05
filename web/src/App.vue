<template>
  <div>
    <AppHeaderSidebar />
    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import AppHeaderSidebar from '@/layouts/AppHeaderSidebar.vue';
import { signIn } from '@/libraries/surreal';

onMounted(() => {
  signIn('admin', 'admin');
});
</script>
