import { VueComponent } from '@/types';

export type TabItem = {
  id: string;
  label: string;
  icon?: VueComponent;
  onSelected?: (tabItem: TabItem) => void;
};
