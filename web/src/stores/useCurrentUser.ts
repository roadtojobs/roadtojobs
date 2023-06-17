import { User } from 'shared/entities/user.entity';
import { defineStore } from 'pinia';
import { computed } from 'vue';

/**
 * Note: at App.vue we will always make sure we have proper User set into the store
 * So here we will set a placeholder User to "hack" the type (undefined)
 */
export const useCurrentUser = defineStore('currentUser', () => {
  const user = ref<User>({
    id: '',
    email: '',
    name: '',
    createdAt: new Date(),
    username: '',
  });

  const setUser = (currentUser: User) => {
    user.value = { ...currentUser };
  };

  const userId = computed(() => user.value.id);

  return { user, setUser, userId };
});
