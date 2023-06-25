export type ComboboxItemMode = 'green' | 'yellow' | 'red';

export type ComboboxItem = {
  text: string;
  value: string;
  mode?: ComboboxItemMode;
};
