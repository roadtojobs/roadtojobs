import { StringRecord } from '@/types';
import { DropdownItem } from '@/components/Dropdown/Dropdown.types';

export const attributeDotColors: StringRecord = {
  rose: 'bg-rose-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  sky: 'bg-sky-500',
  pink: 'bg-pink-500',
  purple: 'bg-purple-500',
  amber: 'bg-amber-500',
} as const;

export type AttributeDotColorType = keyof typeof attributeDotColors;

export const attributeDotColorsDropdownItems: DropdownItem[] = Object.keys(
  attributeDotColors
).map((value) => ({
  text: value,
  value: value,
}));
