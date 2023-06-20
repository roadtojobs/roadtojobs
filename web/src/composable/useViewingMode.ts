import { computed } from 'vue';

const THRESHOLD_WIDTH = 768;

export const useViewingMode = () => {
  const isMobile = computed(() => window.innerWidth < THRESHOLD_WIDTH);
  const isDesktop = computed(() => window.innerWidth >= THRESHOLD_WIDTH);

  return {
    isDesktop,
    isMobile,
  };
};
