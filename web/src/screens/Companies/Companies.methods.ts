import { VueComponent } from '@/types';
import { h } from 'vue';
import Button from '@/components/Button/Button.vue';
import { CellContext } from '@tanstack/vue-table';
import { Company } from 'shared';

export const getActionButton = (
  info: CellContext<Company, unknown>,
  onClick: (company: Company) => void
): VueComponent => {
  return h(
    Button,
    {
      onClick: () => onClick(info.row.original),
    },
    () => [h('span', 'View')]
  );
};
