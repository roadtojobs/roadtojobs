import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDraggingState = defineStore('draggingState', () => {
  const dragging = ref(false);

  const markAsDragging = () => {
    dragging.value = true;
  };

  const markAsDropped = () => {
    dragging.value = false;
  };

  return { dragging, markAsDragging, markAsDropped };
});
