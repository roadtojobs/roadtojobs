import { VueComponent } from '@/types';
import { h } from 'vue';
import Button from '@/components/Button/Button.vue';
import { CellContext } from '@tanstack/vue-table';
import { Company } from 'shared';

export const getActionButton = (
  info: CellContext<Company, unknown>,
  onClickViewCompany: (company: Company) => void,
  onClickViewNote: (company: Company) => void
): VueComponent => {
  const company = info.row.original;

  const viewButton = h(
    Button,
    {
      'data-testid': `view-company-${info.row.index}`,
      onClick: () => onClickViewCompany(company),
    },
    () => [h('span', 'View')]
  );

  const noteButton = h(
    Button,
    {
      type: 'neutral',
      onClick: () => onClickViewNote(company),
    },
    () => [h('span', 'My Notes')]
  );

  return h(
    'div',
    {
      className: 'flex gap-1',
    },
    [viewButton, company.companyNotes?.length ? noteButton : null]
  );
};
