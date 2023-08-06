import { computed, ComputedRef, Ref, h } from 'vue';
import { Journey } from 'shared/entities/journey.entity';
import { UpdateJourney } from '@/repositories/journey.repo';
import Input from '@/components/Input/Input.vue';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent.vue';
import { getDisplayDate, parseServerDate } from '@/utils/date';
import { VueComponent } from '@/types';
import FinalizeJourneyButton from '@/screens/InterviewJourneyView/components/InfoView/FinalizeJourneyButton.vue';
import MarkdownEditor from '@/components/MarkdownEditor/MarkdownEditor.vue';

type Props = {
  journey: ComputedRef<Journey>;
  editForm: Ref<UpdateJourney>;
  errorsBag: Ref<Map<keyof UpdateJourney, string | undefined>>;
  onFinalizedJourney: (journey: Journey) => void;
};

type RenderItem = {
  key: keyof Journey;
  label: string;
  Text: () => VueComponent;
  EditComponent?: () => VueComponent;
};

export const useInfoViewRenderItems = ({
  journey,
  editForm,
  errorsBag,
  onFinalizedJourney,
}: Props) => {
  const renderItems = computed<RenderItem[]>((): RenderItem[] => {
    const isArchived = !!journey.value.archivedAt;
    const isEnded = !!journey.value.endedAt;

    // () => h(..) is a strategy to render on demand
    // we don't need to render the VNode on runtime
    const items: RenderItem[] = [
      {
        label: 'Journey Name 💼',
        Text: () =>
          h('span', {
            innerText: journey.value.name,
          }),
        key: 'name',
        EditComponent: () =>
          h(Input, {
            modelValue: editForm.value.name,
            error: errorsBag.value.get('name'),
            'onUpdate:modelValue'(value: string | undefined) {
              editForm.value.name = value || '';
            },
          }),
      },
      {
        label: 'Journey Description 📖',
        Text: () => h(MarkdownContent, () => journey.value.description),
        key: 'description',
        EditComponent: () =>
          h(MarkdownEditor, {
            modelValue: editForm.value.description,
            error: errorsBag.value.get('description'),
            'onUpdate:modelValue'(value: string | undefined) {
              editForm.value.description = value || '';
            },
          }),
      },
      {
        label: 'Personal Goals/Notes 🚀',
        Text: () =>
          journey.value.note
            ? h(MarkdownContent, () => journey.value.note)
            : h('span', { innerText: '-' }),
        key: 'note',
        EditComponent: () =>
          h(MarkdownEditor, {
            modelValue: editForm.value.note || '',
            error: errorsBag.value.get('note'),
            'onUpdate:modelValue'(value: string | undefined) {
              editForm.value.note = value || '';
            },
          }),
      },
      {
        label: 'Journey Started At 🏎️',
        Text: () =>
          h('span', {
            innerText: getDisplayDate(journey.value.startedAt),
          }),
        key: 'startedAt',
        EditComponent: () =>
          h(Input, {
            modelValue: parseServerDate(editForm.value.startedAt),
            type: 'date',
            error: errorsBag.value.get('startedAt'),
            'onUpdate:modelValue'(value: string | Date | undefined) {
              editForm.value.startedAt = value ? new Date(value) : new Date();
            },
          }),
      },
      {
        label: 'Journey Ended At 🔥',
        Text: () =>
          journey.value.endedAt
            ? h('span', {
                innerText: getDisplayDate(journey.value.endedAt),
              })
            : h(FinalizeJourneyButton, {
                journey: journey.value,
                onEnded: onFinalizedJourney,
              }),
        key: 'endedAt',
      },
    ];

    if (isEnded) {
      items.push({
        label: 'Journey Ended Reason 😎',
        Text: () =>
          journey.value.endedReason
            ? h(MarkdownContent, () => journey.value.endedReason)
            : h('span', { innerText: '-' }),
        key: 'endedReason',
      });
    }

    if (isArchived) {
      items.push({
        label: 'Journey Archived At 🎃',
        Text: () =>
          h('span', {
            innerText: getDisplayDate(journey.value.archivedAt as Date),
          }),
        key: 'archivedAt',
      });

      items.push({
        label: 'Archive Reason 🔰',
        Text: () =>
          journey.value.archivedReason
            ? h(MarkdownContent, () => journey.value.archivedReason)
            : h('span', { innerText: '-' }),
        key: 'archivedReason',
      });
    }

    return items;
  });

  return {
    renderItems,
  };
};
