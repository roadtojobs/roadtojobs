import { computed, ComputedRef, Ref } from 'vue';
import { Journey } from 'shared/entities/journey.entity';
import { UpdateJourney } from '@/repositories/journey.repo';
import Input from '@/components/Input/Input.vue';
import MarkdownContent from '@/components/MarkdownContent/MarkdownContent.vue';
import Textarea from '@/components/Textarea/Textarea.vue';
import { getDisplayDate, parseServerDate } from '@/utils/date';
import Button from '@/components/Button/Button.vue';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { VueComponent } from '@/types';

type Props = {
  journey: ComputedRef<Journey>;
  editForm: Ref<UpdateJourney>;
  errorsBag: Ref<Map<keyof UpdateJourney, string | undefined>>;
  onClickFinalizeJourney: () => void;
};

type RenderItem = {
  key: keyof Journey;
  label: string;
  Text: VueComponent;
  EditComponent?: VueComponent;
};

export const useInfoViewRenderItems = ({
  journey,
  editForm,
  errorsBag,
  onClickFinalizeJourney,
}: Props) => {
  // () => h(..) is a strategy to render on demand
  // we don't need to render the VNode on runtime
  const renderItems = computed<RenderItem[]>((): RenderItem[] => {
    // TODO: add archived at & archived reason info markdown here
    return [
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
            'onUpdate:modelValue'(value: string) {
              editForm.value.name = value;
            },
          }),
      },
      {
        label: 'Journey Description 📖',
        Text: () => h(MarkdownContent, () => journey.value.description),
        key: 'description',
        EditComponent: () =>
          h(Textarea, {
            modelValue: editForm.value.description,
            rows: 8,
            error: errorsBag.value.get('description'),
            'onUpdate:modelValue'(value: string) {
              editForm.value.description = value;
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
          h(Textarea, {
            modelValue: editForm.value.note,
            rows: 8,
            error: errorsBag.value.get('note'),
            'onUpdate:modelValue'(value: string) {
              editForm.value.note = value;
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
            'onUpdate:modelValue'(value: string) {
              editForm.value.startedAt = new Date(value);
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
            : !journey.value.archivedAt
            ? h(
                Button,
                {
                  icon: h(CheckBadgeIcon),
                  type: 'neutral',
                  onClick: onClickFinalizeJourney,
                },
                () => 'Finalize / Mark as Ended'
              )
            : '-',
        key: 'endedAt',
      },
    ];
  });

  return {
    renderItems,
  };
};
