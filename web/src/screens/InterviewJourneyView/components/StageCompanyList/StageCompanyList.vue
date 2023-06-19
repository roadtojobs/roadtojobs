<template>
  <Sortable
    :list="journeyItems"
    item-key="stage-companies"
    tag="div"
    class="flex flex-row gap-2 w-full"
    :options="{ group: 'stage-companies', disabled }"
    @add="onAdded"
  >
    <template
      v-if="!journeyItems.length"
      #header
    >
      <span>
        No company here 👀 You can add one or drag & drop existing node to
        advance status.
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
  </Sortable>
</template>

<script setup lang="ts">
import { JourneyItem } from 'shared/entities/journeyItem.entity';
import { Stage } from 'shared/entities/stage.entity';
import StageCompanyItem from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyItem.vue';
import { Sortable } from 'sortablejs-vue3';

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

const onAdded = (e: CustomEvent & { item: HTMLElement }) => {
  const journeyItemId = e.item.getAttribute('attr-journey-item-id') || '';
  const wantedStageId = props.stage.id;

  emits('added', {
    journeyItemId,
    wantedStageId,
  });
};
</script>
