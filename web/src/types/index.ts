import { FunctionalComponent, VNode } from 'vue';

export type VueComponent = VNode | FunctionalComponent;

export type StringRecord = Record<string, string>;
export type UnknownRecord = Record<string, unknown>;
