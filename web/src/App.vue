<template>
  <div>
    <AppHeaderSidebar />
    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <router-view />
      </div>

      <AppFooter />
    </main>

    <notifications />
  </div>
</template>

<script setup>
import AppHeaderSidebar from '@/layouts/AppHeaderSidebar.vue';
import { signIn } from '@/libraries/surreal';
import AppFooter from '@/layouts/AppFooter.vue';
import { userRepo } from '@/repositories/user.repo';
import { redirectSelf } from '@/utils/forceRedirect';
import { useCurrentUser } from '@/stores/useCurrentUser';

const { setUser } = useCurrentUser();

onMounted(async () => {
  // for single usage, use the default hardcoded pass here
  const result = await signIn('admin', 'admin');

  if (!result) {
    return redirectSelf();
  }

  // get user
  const user = await userRepo.getLoggedInUser();
  if (!user) {
    return redirectSelf();
  }

  setUser?.(user);
});
</script>
