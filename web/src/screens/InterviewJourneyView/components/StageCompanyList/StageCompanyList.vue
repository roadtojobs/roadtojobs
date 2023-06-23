<template>
  <Sortable
    ref="sortable"
    :list="journeyItems"
    item-key="stage-companies"
    tag="div"
    class="flex flex-row gap-2 relative flex-wrap"
    :class="{
      'border-2 border-rose-300 rounded border-dashed py-2': isDragging,
    }"
    :options="{
      group: 'stage-companies',
      disabled: disabledDragDrop,
      draggable: '.journey-node-item',
    }"
    @add="onAdded"
    @move.capture="draggingState.markAsDragging"
    @end="draggingState.markAsDropped"
  >
    <template #header>
      <div v-if="!journeyItems.length && !isDragging">
        <span> No company here 👀</span>
        <span
          v-if="!journey.archivedAt && !journey.endedAt"
          class="hidden lg:inline-block"
        >
          &nbsp;You can add one or drag & drop existing node to advance status.
        </span>
      </div>
      <span
        v-if="isDragging"
        class="absolute top-2 left-1/2 text-center z-0"
      >
        {{ stage.name }}
      </span>
    </template>
    <template #item="{ element, index }">
      <StageCompanyItem
        :key="(element as JourneyItem).id"
        :journey-item="element"
        :attr-journey-item-id="(element as JourneyItem).id"
        :attr-stage-id="(element as JourneyItem).stageId"
        @click="(item) => $emit('click', item)"
      />
    </template>
    <template #footer>
      <span v-if="!journeyItems.length || isDragging">&nbsp;</span>
    </template>
  </Sortable>
</template>

<script setup lang="ts">
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { Stage } from 'shared/entities/stage.entity';
import StageCompanyItem from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyItem.vue';
import { Sortable } from 'sortablejs-vue3';
import { useCurrentJourney } from '@/stores/useCurrentJourney';
import { computed } from 'vue';
import { useDraggingState } from '@/stores/useDraggingState';

type StageCompanyListProps = {
  stage: Stage;
  journeyItems: JourneyItem[];
  disabled?: boolean;
};

type StageCompanyListEmits = {
  (e: 'click', journeyItem: JourneyItem): void;
  (
    e: 'added',
    item: {
      journeyItemId: string;
      wantedStageId: string;
    }
  ): void;
};

const props = defineProps<StageCompanyListProps>();
const emits = defineEmits<StageCompanyListEmits>();

const currentJourney = useCurrentJourney();
const journey = computed(() => currentJourney.journey);

const disabledDragDrop = computed(
  () => !!journey.value.archivedAt || !!journey.value.endedAt || props.disabled
);

const draggingState = useDraggingState();

const isDragging = computed(() => {
  return draggingState.dragging;
});

const onAdded = (e: CustomEvent & { item: HTMLElement }) => {
  const journeyItemId = e.item.getAttribute('attr-journey-item-id') || '';
  const wantedStageId = props.stage.id;

  emits('added', {
    journeyItemId,
    wantedStageId,
  });
};
</script>
