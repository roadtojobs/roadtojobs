import { User, userRepo } from '@/repositories/user.repo';
import { Ref } from 'vue';

export default function useCurrentUser(): {
  user: Ref<User | undefined>;
} {
  const user = ref<User | undefined>();

  onMounted(async () => {
    const retrievedUser = await userRepo.getLoggedInUser();

    user.value = retrievedUser
      ? {
          ...retrievedUser,
        }
      : undefined;
  });

  return {
    user,
  };
}
