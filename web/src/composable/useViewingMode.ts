import { computed, onMounted } from 'vue';
import { debounce } from 'lodash-es';

const THRESHOLD_WIDTH = 768;

export const useViewingMode = () => {
  const windowWidth = ref(window.innerWidth);

  const isMobile = computed(() => windowWidth.value < THRESHOLD_WIDTH);
  const isDesktop = computed(() => windowWidth.value >= THRESHOLD_WIDTH);

  const resize = debounce(() => {
    windowWidth.value = window.innerWidth;
  }, 300);

  onMounted(() => {
    window.addEventListener('resize', resize);
  });

  return {
    isDesktop,
    isMobile,
  };
};
