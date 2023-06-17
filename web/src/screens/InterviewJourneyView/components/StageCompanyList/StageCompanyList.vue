<template>
  <Sortable
    :list="journeyCompanyItems"
    item-key="stage-companies"
    tag="div"
    class="flex flex-row gap-2 w-full"
    :options="{ group: 'stage-companies' }"
    @add="onAdded"
  >
    <template
      v-if="!journeyCompanyItems.length"
      #header
    >
      <span>
        No company here 👀 You can add one or drag & drop existing node to
        advance status.
      </span>
    </template>
    <template #item="{ element, index }">
      <StageCompanyItem
        :key="(element as InterviewJourneyCompany).id"
        :journey-company-item="element"
        :attr-journey-item-id="(element as InterviewJourneyCompany).id"
        :attr-stage-id="(element as InterviewJourneyCompany).stageId"
        @click="(item) => $emit('click', item)"
      />
    </template>
  </Sortable>
</template>

<script setup lang="ts">
import { InterviewJourneyCompany } from '@/repositories/interviewJourneyCompany.repo';
import { Stage } from 'shared/entities/stage.entity';
import StageCompanyItem from '@/screens/InterviewJourneyView/components/StageCompanyList/StageCompanyItem.vue';
import { Sortable } from 'sortablejs-vue3';

type StageCompanyListProps = {
  stage: Stage;
  journeyCompanyItems: InterviewJourneyCompany[];
};

const props = defineProps<StageCompanyListProps>();

const emits = defineEmits<{
  (e: 'click', journeyCompanyItem: InterviewJourneyCompany): void;
  (
    e: 'added',
    item: {
      journeyItemId: string;
      wantedStageId: string;
    }
  ): void;
}>();

const onAdded = (e: CustomEvent & { item: HTMLElement }) => {
  const journeyItemId = e.item.getAttribute('attr-journey-item-id') || '';
  const wantedStageId = props.stage.id;

  emits('added', {
    journeyItemId,
    wantedStageId,
  });
};
</script>
