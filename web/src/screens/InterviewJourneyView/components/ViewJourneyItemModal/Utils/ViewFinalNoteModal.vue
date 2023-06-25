<template>
  <Modal
    :title="`The final stage note of ${props.journeyItem.company?.name}`"
    :is-open="isOpen"
    @close="$emit('close')"
    width-size="xl"
  >
    <div>
      <dl class="grid grid-cols-1">
        <div
          v-for="item in renderItems"
          :key="item.key"
          class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0"
        >
          <dt class="text-sm font-medium leading-6 text-gray-900">
            {{ item.label }}
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
            <component :is="item.Component" />
          </dd>
        </div>
      </dl>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import { CompanyNote, JourneyItem } from 'shared/entities';
import { computed, h } from 'vue';
import { VueComponent } from '@/types';
import { Feeling, feelingLabelMap } from '@/constants/feeling';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent.vue';
import { Opinion, opinionLabelMap } from '@/constants/opinion';

type ViewFinalNoteModalProps = {
  journeyItem: JourneyItem;
  companyNote: CompanyNote;
  isOpen: boolean;
};

type ViewFinalNoteModalEmits = {
  (e: 'close'): void;
};

const props = defineProps<ViewFinalNoteModalProps>();
defineEmits<ViewFinalNoteModalEmits>();

type RenderItem = {
  key: string;
  label: string;
  Component: () => VueComponent;
};

const renderItems = computed((): RenderItem[] => {
  const companyNote = props.companyNote;

  const items: RenderItem[] = [
    {
      key: 'feeling',
      label: 'Your Feeling',
      Component: () =>
        h('span', {
          innerText: feelingLabelMap[props.companyNote.feeling as Feeling],
        }),
    },
    {
      key: 'feelingNote',
      label: 'Feeling Note',
      Component: () =>
        companyNote.feelingNote
          ? h(MarkdownContent, () => companyNote.feelingNote)
          : h('span', { innerText: '-' }),
    },
  ];

  if (companyNote.stageId !== 'stage:accepted_offer') {
    items.push(
      ...[
        {
          key: 'opinion',
          label: 'Your Opinion',
          Component: () =>
            h('span', {
              innerText: opinionLabelMap[props.companyNote.opinion as Opinion],
            }),
        },
        {
          key: 'opinionNote',
          label: 'Opinion Note',
          Component: () =>
            companyNote.opinionNote
              ? h(MarkdownContent, () => companyNote.opinionNote)
              : h('span', { innerText: '-' }),
        },
      ]
    );
  }

  items.push({
    key: 'note',
    label: 'Additional Note',
    Component: () =>
      companyNote.note
        ? h(MarkdownContent, () => companyNote.note)
        : h('span', { innerText: '-' }),
  });

  return items;
});
</script>
