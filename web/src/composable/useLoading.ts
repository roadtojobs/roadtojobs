import { ref } from 'vue';

export const useLoading = () => {
  const isLoading = ref(false);

  const startLoading = () => {
    isLoading.value = true;
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  const withLoading = async (callback: <T>() => Promise<T>) => {
    startLoading();

    const result = await callback();

    stopLoading();

    return result;
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
};
